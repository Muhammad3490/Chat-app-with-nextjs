import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    content: string;
    name: string;
    imgUrl: string | null;
    author: 'current' | 'other';
    created_at:Date;
}

const MessageBubble = ({ content, name, imgUrl, author,created_at}: MessageBubbleProps) => {
    return (
        <div className={cn("w-full my-2", author === "current" ? "flex justify-end" : "flex justify-start")}>
            <div className={cn("flex flex-col justify-start items-center rounded-md max-w-[160px] min-w-[100px] px-3 py-2", author === "current" ? "bg-secondary" : "bg-purple-700")}>
                <div className="w-full py-1 flex space-x-1 h-auto">
                    <Avatar className="w-4 h-4"> {/* Increased size for better visibility */}
                        <AvatarImage src={imgUrl || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback> {/* Fallback shows the first letter of the name */}
                    </Avatar>
                    <p className="font-semibold text-xs text-neutral-800 dark:text-white">{name}</p>
                </div>
                <div className="w-full h-auto  py-1 flex flex-wrap text-wrap">
                    <p className="text-sm text-neutral-800 dark:text-white">{content}</p>
                </div>
                <div className="bottom-0 relative right-0 w-full "><p className="text-[6px] text-neutral-200">{new Date(created_at).toLocaleTimeString()|| ""}</p></div>
            </div>
        </div>
    );
};

export default MessageBubble;
