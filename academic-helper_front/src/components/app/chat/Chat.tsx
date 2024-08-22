import * as React from "react"
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Nav} from "@/components/app/chat/Nav.tsx";
import {ChatDisplay} from "@/components/app/chat/ChatDisplay.tsx";
import {cn} from "@/lib/utils.ts";
import {CreateConversationModal} from "@/components/app/chat/CreateConversationModal.tsx";
import instance from "@/lib/axios.ts";
import {ConversationDTO} from "@/components/DTO/ConversationDTO.ts";
import {useEffect, useState} from "react";

interface LayoutProps {
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number
}
export function Chat({
                         defaultLayout = [265, 440, 655],
                         defaultCollapsed = false,
                         navCollapsedSize,
                     }: LayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
    const [conversations, setConversations] = useState<ConversationDTO[]>([])
    useEffect(() => {
        fetchConversations()
    }, [])

    useEffect(() => {

    }, [conversations]);
    const fetchConversations = () => {
        let conversationsData: ConversationDTO[] = []
        instance.get(`/conversations`)
            .then((res) => {
                conversationsData = res.data.data
                if(conversationsData.length > 0) {
                    instance.get(`/conversations/${conversationsData[0].id}/messages`)
                        .then((res) => {
                            conversationsData[0] = res.data.data;
                            conversationsData[0].active = true;
                            setConversations([...conversationsData]);
                        }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
            console.log(err);
        });
    }

    const addConversation = (newConversation) => {
        setConversations([...conversations, newConversation])
    }
    const deleteConversation = (conversationId) => {
        setConversations(conversations.filter((conversation) => conversation.id !== conversationId))
    }

    const fetchMessages = (conversationId: number) => {
        instance.get(`/conversations/${conversationId}/messages`)
            .then((res) => {
                let conversationToEdit = conversations.findIndex((conversation: ConversationDTO) => conversation.id === conversationId)
                let lastActive = conversations.findIndex((conversation: ConversationDTO) => conversation.active)
                conversations[lastActive].active = false;
                conversations[conversationToEdit] = res.data.data;
                conversations[conversationToEdit].active = true;
                setConversations([...conversations]);
            }).catch((err) => {
            console.log(err);
        });
    }

    const sendMessage = (message: string, conversationId: number) => {
        instance.post(`/messages`, {
            content: message,
            conversationId: conversationId,
            type: 'question'
        })
            .then((res) => {
                let response = res.data.data
                let conversationToEdit = conversations.findIndex((conversation: ConversationDTO) => conversation.id === conversationId)
                conversations[conversationToEdit].messages.push(response.newMessage)
                conversations[conversationToEdit].messages.push(response.newAnswer)
                setConversations([...conversations])
                console.log(conversations)
            }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={(collapsed) => {
                        setIsCollapsed(collapsed)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            collapsed
                        )}`
                    }}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                    <Separator/>
                    <CreateConversationModal addConversation={addConversation}/>
                    <Separator/>
                    <Nav
                        isCollapsed="false"
                        conversations={conversations}
                        fetchMessages={fetchMessages}
                        updateConversations={deleteConversation}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <ChatDisplay
                        conversation={conversations.find((conversation) => conversation.active)}
                        sendMessage={sendMessage}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}