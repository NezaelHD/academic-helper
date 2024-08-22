import { Elysia, t } from "elysia";
import { prisma } from "~libs/prisma";
import { isAuthenticated } from "~middlewares/auth";

export const conversations = (app: Elysia) =>
    app.group("/conversations", (app) =>
        app
            .use(isAuthenticated)
            .get("/", async ({ params, set }) => {
                const conversations = await prisma.conversation.findMany({
                    where: {
                        deletedAt: null,
                    },
                });

                if (!conversations) {
                    set.status = 400;
                    return {
                        success: false,
                        data: null,
                        message: "No conversations found",
                    };
                }

                return {
                    success: true,
                    data: conversations,
                };
            })
            .delete("/:id", async ({ params, set }) => {
                const deletedConversation = await prisma.conversation.delete({
                    where: {
                        id: params.id
                    }
                })

                if (!deletedConversation) {
                    set.status = 400;
                    return {
                        success: false,
                        data: null,
                        message: "No conversations found",
                    };
                }

                return {
                    success: true,
                    data: deletedConversation,
                };
            }, {
                params: t.Object({
                    id: t.Numeric()
                })
            })
            .post("/", async ({ body, user }) => {
                const { name } = body;

                const newConversation = await prisma.conversation.create({
                    data: {
                        name,
                        users: {
                            connect: {
                                id: user.id
                            }
                        }
                    },
                });

                return {
                    success: true,
                    message: "Conversation created",
                    data: newConversation,
                };
            })
            .get("/:id/messages", async ({ params, set }) => {
                const messages = await prisma.conversation.findUnique({
                    where: {
                        id: params.id,
                        deletedAt: null,
                    },
                    include: {
                        messages: true
                    },
                });

                if (!messages) {
                    set.status = 400;
                    return {
                        success: false,
                        data: null,
                        message: "No conversations found",
                    };
                }

                return {
                    success: true,
                    data: messages,
                };
            }, {
                params: t.Object({
                    id: t.Numeric()
                })
            })
);

