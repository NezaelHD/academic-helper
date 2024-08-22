"use client"
import {Link} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {ConversationDTO} from "@/components/DTO/ConversationDTO.ts";
import instance from "@/lib/axios.ts";
import {TrashIcon} from "@radix-ui/react-icons";

export function Nav({conversations, fetchMessages, deleteConversation}: ConversationDTO[]) {

    const removeConversation = (conversationId: number) => {
        instance.delete(`/conversations/${conversationId}`)
            .then((res) => {
                deleteConversation(conversationId);
            }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav
                className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {conversations.map((conversation, index) =>
                    <Link
                        to=""
                        key={index}
                        onClick={() => fetchMessages(conversation.id)}
                        className={cn(
                            buttonVariants({variant: conversation.variant, size: "sm"}),
                            !conversation.active &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-between"
                        )}
                    >
                        {conversation.name}
                        <Button variant="ghost" size="icon" onClick={() => removeConversation(conversation.id)}>
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                )}
            </nav>
        </div>
    )
}