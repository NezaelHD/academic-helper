import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "@/components/shared/AuthContext.tsx";
import smallLogo from "@/assets/logo-small.png";

export function ChatDisplay({conversation, sendMessage}) {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState<string>('');
    const messageContainer = useRef<Node>();


    const handleMessageChange = ((e) => {
        setMessage(e.target.value);
    })
    const handleOnClick = (e) => {
        e.preventDefault();
        sendMessage(message, conversation.id)
        setMessage('');
    }


    useEffect(() => {
        if(messageContainer.current) {
            const observerCallback = (mutationsList, observer) => {
                mutationsList.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        messageContainer.current?.scrollIntoView(false)
                    }
                });
            };
            const observer = new MutationObserver(observerCallback);

            if (messageContainer.current) {
                observer.observe(messageContainer.current, {childList: true, subtree: true});
            }

            return () => {
                observer.disconnect();
            };
        }
    }, [messageContainer.current]);

    useEffect(() => {
        messageContainer.current?.scrollIntoView(false)

    }, [conversation]);

    if(!conversation) return (<div></div>)
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
                <h2>{conversation.name}</h2>
            </div>
            <Separator/>
            <div className="flex flex-1 flex-col">
                <ScrollArea className="h-[42vh]">
                    <div ref={messageContainer} className="p-4">
                        <div className="text-sm">
                            {conversation.messages?.map((message, index) => (
                                <div key={index} className="flex gap-2 items-center py-2">
                                    <Avatar className={`${message.type !== 'answer' ? 'order-last' : ''}`}>
                                        <AvatarImage alt={message.sender} src={`${message.type === 'answer' ? smallLogo : user.profileImage}`}/>
                                        <AvatarFallback>
                                            {`${message.type === 'answer' ? 'L' : user.username.charAt(0)}`}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={`flex max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${message.type !== 'answer' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
                <Separator className="mt-auto"/>
                <div className="p-4">
                    <form>
                        <div className="grid gap-4">
                            <Textarea
                                className="p-4"
                                value={message}
                                placeholder={`Entrer une question`}
                                onInput={handleMessageChange}
                            />
                            <div className="flex items-center">
                                <Button
                                    onClick={handleOnClick}
                                    size="sm"
                                    className="ml-auto"
                                >
                                    Envoyer
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}