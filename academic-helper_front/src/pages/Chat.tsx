import {Mail} from "@/components/app/chat/Mail.tsx";

export default function ChatPage() {
    const mails = [
        {
            id: "6c9a7f94-8329-4d70-95d3-51f68c186ae1",
            name: "Samuel Turner",
            email: "samuelturner@example.com",
            subject: "Weekend Hike",
            text: "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.\n\nI've done some research and have a few routes in mind.\n\nLet me know if you're interested, and we can plan the details.\n\nIt's sure to be a memorable experience! Samuel",
            date: "2022-07-28T17:30:00",
            read: false,
            labels: ["personal"],
        },
    ]
    return (
        <>
            <div className="hidden flex-col md:flex">
                <Mail
                    mails={mails}
                    navCollapsedSize={4}
                    defaultLayout={[265, 440, 655]}
                />
            </div>
        </>
    )
}