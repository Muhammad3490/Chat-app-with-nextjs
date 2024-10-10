import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db"; // Assuming you have db client setup in `lib/db`
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SearchPeople from "@/components/search-component";
import DialogComponent from "@/components/Dialog-components";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Chat } from "@prisma/client";

// Custom type that includes chat and member profiles
type ChatWithProfiles = Chat & {
    memberOneProfile: {
        id: string;
        name: string;
        imageUrl?: string;
    };
    memberTwoProfile: {
        id: string;
        name: string;
        imageUrl?: string;
    };
};

const UserChatsPage = async () => {
    // Get the current user's profile
    const profile = await currentProfile();

    if (!profile) {
        return (
            <div className="w-screen min-h-screen h-auto flex justify-center items-center">
                <p className="text-xl">You are not logged in.</p>
            </div>
        );
    }

    const chats: ChatWithProfiles[] = await db.chat.findMany({
        where: {
            OR: [
                { memberOne: profile.id },
                { memberTwo: profile.id },
            ],
            NOT: {
                memberOne: profile.id, // Prevent chat with oneself
                memberTwo: profile.id,
            },
        },
        include: {
            memberOneProfile: true,
            memberTwoProfile: true,
            messages: {
                orderBy: { createdAt: 'desc' }, // Fetch latest messages
                take: 1, // Only fetch the latest message per chat
            },
        },
    });

    return (
        <>
            <Navbar />
            <div className="w-screen min-h-screen h-auto flex flex-col justify-start lg:px-5 px-2 pt-14 items-start">
                <h1 className="text-2xl font-bold mb-4">Your Chats</h1>
                {chats.length > 0 ? (
                    <ScrollArea className="h-full py-8 w-full flex justify-center items-center">
                        <div className="w-full max-w-md rounded-lg">
                            {chats.map((chat) => (
                                <Link
                                    key={chat.id} // Use chat.id for the key prop
                                    href={`/${profile.id}/chats/users/${chat.memberOne === profile.id ? chat.memberTwo : chat.memberOne}`}
                                >
                                    <div className="p-4 px-2 border-b flex items-center cursor-pointer">
                                        <Avatar className="lg:w-12 lg:h-12 w-8 h-8 border-neutral-400 border/50">
                                            <AvatarImage
                                                src={chat.memberOne === profile.id ? chat.memberTwoProfile?.imageUrl : chat.memberOneProfile?.imageUrl || ""}
                                                alt="User Avatar"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <p className="text-lg font-semibold">
                                                {chat.memberOne === profile.id ? chat.memberTwoProfile.name : chat.memberOneProfile.name}
                                            </p>
                                            {chat.messages.length > 0 ? (
                                                <p className="text-sm text-gray-600">
                                                    {chat.messages[0].content}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-gray-600">No messages yet</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                ) : (
                    <p className="text-xl">No chats available</p>
                )}
                <DialogComponent
                    trigger={
                        <Button size={'icon'} className="fixed right-0 bottom-0 m-8">
                            <MessageCircle className="h-5 w-5 text-neutral-200" />
                        </Button>
                    }
                    title="Search"
                    desp="Search here"
                    content={<SearchPeople profileId={profile.id} />}
                />
            </div>
        </>
    );
};

export default UserChatsPage;
