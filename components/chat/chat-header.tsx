'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { ModeToggle } from "../theme-provider/mode-toggle";

interface HeaderProps {

    imgUrl: string | null,
    name: string,
    id: string,

}
const ChatHeader = ({ imgUrl, name, id }: HeaderProps) => {
    return (
        <div className="w-full flex justify-between items-center py-3 border-b top-0 fixed z-20 bg-secondary border-neutral-400 dark:border-neutral-800 px-3">

            <div className="flex space-x-2 justify-center items-center">
                <Link href={`/users/${id}`}>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={imgUrl || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <p className="font-semibold text-sm">{name}</p>
            </div>
            <ModeToggle/>
        </div>
    );
}

export default ChatHeader;