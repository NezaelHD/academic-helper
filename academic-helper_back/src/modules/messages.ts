import { Elysia, t } from "elysia";
import { prisma } from "~libs/prisma";
import { isAuthenticated } from "~middlewares/auth";
import { OpenAI } from "openai";
import {ChatCompletion} from "openai/resources";


export const messages = (app: Elysia) =>
    app.group("/messages", (app) =>
        app
            .use(isAuthenticated)
            .get("/:id", async ({ params, set }) => {
                const message = await prisma.message.findFirst({
                    where: {
                        id: params.id,
                    },
                });

                if (!message) {
                    set.status = 400;
                    return {
                        success: false,
                        data: null,
                        message: "No message found",
                    };
                }

                return {
                    success: true,
                    data: message,
                };
            })
            .post("/", async ({ body, set }) => {
                const { content, conversationId, type } = body;

                const context = await getConversationContext(conversationId);
                const chatGPTResponse = await sendMessageToChatGPT(content, context);

                const newMessage = await prisma.message.create({
                    data: {
                        content,
                        conversationId,
                        type,
                    },
                });

                const newAnswer = await prisma.message.create({
                    data: {
                        content: chatGPTResponse,
                        conversationId,
                        type: "answer",
                    },
                });

                return {
                    success: true,
                    message: "Message created",
                    data: {
                        newMessage,
                        newAnswer,
                    },
                };
            })
    );

async function getConversationContext(conversationId) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        const context = messages.map(msg => msg.content).join('\n');
        return context;
    } catch (error) {
        console.error('Error fetching conversation context:', error);
        throw error;
    }
}
async function sendMessageToChatGPT(message, context) {
    const configuration = {
        apiKey: Bun.env.OPENAI_API_KEY
    };
    const openai: OpenAI = new OpenAI(configuration);
    try {
        const completion: ChatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: context
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "gpt-3.5-turbo",
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error sending message to ChatGPT:', error);
        throw error;
    }
}
