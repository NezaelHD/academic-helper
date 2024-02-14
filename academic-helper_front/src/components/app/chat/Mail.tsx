import * as React from "react"
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Nav} from "@/components/app/chat/Nav.tsx";
import {MailDisplay} from "@/components/app/chat/MailDisplay.tsx";
import {cn} from "@/lib/utils.ts";

interface MailProps {
    mails: {
        id: string,
        name: string,
        email: string,
        subject: string,
        text: string,
        date: string,
        read: boolean,
        labels: string[],
    }[]
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number
}

export function Mail({
                         mails,
                         defaultLayout = [265, 440, 655],
                         defaultCollapsed = false,
                         navCollapsedSize,
                     }: MailProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

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
                    <Nav
                        isCollapsed="false"
                        links={[
                            {
                                title: "Inbox",
                                label: "128",
                                variant: "default",
                            },
                            {
                                title: "Drafts",
                                label: "9",
                                variant: "ghost",
                            },
                            {
                                title: "Sent",
                                label: "",
                                variant: "ghost",
                            },
                            {
                                title: "Junk",
                                label: "23",
                                variant: "ghost",
                            },
                            {
                                title: "Trash",
                                label: "",
                                variant: "ghost",
                            },
                            {
                                title: "Archive",
                                label: "",
                                variant: "ghost",
                            },
                        ]}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <MailDisplay
                        mail={mails.find((item) => item.id === 1) || null}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}