import {Chat} from "@/components/app/chat/Chat.tsx";

export default function ChatPage() {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <Chat
                    navCollapsedSize={4}
                    defaultLayout={[265, 440, 655]}
                />
            </div>
        </>
    )
}