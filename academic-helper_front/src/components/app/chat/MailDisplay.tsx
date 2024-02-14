import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export function MailDisplay({mail}) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
                <h2>Question de philosophie</h2>
            </div>
            <Separator/>
            <div className="flex flex-1 flex-col">
                <ScrollArea className="h-[42vh]">
                    <div className="p-4">
                        <div className="text-sm">
                            <div className="space-y-4">
                                <div className="flex gap-2 items-center">
                                    <Avatar className="order-last">
                                        <AvatarImage alt="name"/>
                                        <AvatarFallback>
                                            A
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={"flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground"}
                                    >
                                        kze,nflzkefn, pzekf,zpekf,zepfk,zpe fk,nzepfknzeofkn,zef
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Avatar>
                                        <AvatarImage alt="name"/>
                                        <AvatarFallback>
                                            A
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={"flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted"}
                                    >
                                        kze,nflzkefn, pzekf,zpekf,zepfk,zpe fk,nzepfknzeofkn,zef
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <Separator className="mt-auto"/>
                <div className="p-4">
                    <form>
                        <div className="grid gap-4">
                            <Textarea
                                className="p-4"
                                placeholder={`Entrer une question`}
                            />
                            <div className="flex items-center">
                                <Button
                                    onClick={(e) => e.preventDefault()}
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