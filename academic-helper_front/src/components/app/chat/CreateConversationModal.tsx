import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {cn} from "@/lib/utils.ts";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import * as React from "react";
import {useState} from "react";
import instance from "@/lib/axios.ts";

export function CreateConversationModal({updateConversations}) {
    const [conversationName, setConversationName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleConversationNameChange = (e) => {
        setConversationName(e.target.value);
    }
    const createNewConversation = (e) => {
        instance.post("/conversations", {
            name: conversationName
        }).then((res) => {
            updateConversations(res.data.data);
            setIsOpen(true);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className={cn(
                buttonVariants({variant: "primary", size: "sm"}),
                "dark:bg-primary dark:hover:bg-muted dark:hover:text-white my-2 mx-auto block")}>Nouvelle conversation</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Comment s'appellera cette nouvelle conversation ?</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input id="name" className="col-span-3" value={conversationName} onChange={handleConversationNameChange}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button  type="submit" onClick={createNewConversation}>Créer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};