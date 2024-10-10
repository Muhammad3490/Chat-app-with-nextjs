import { currentProfile } from "@/lib/current-profile";
import { findOrCreateChat } from "@/lib/create-or-find-chat";
import DialogComponent from "@/components/Dialog-components";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import SearchPeople from "@/components/search-component";
import ChatHeader from "@/components/chat/chat-header";
import ChatComponent from "@/components/chat/chat-component";

interface PageProps {
    params: { userId: string };
}

const Chatpage = async ({ params }: PageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <p>No profile found. Please log in.</p>
            </div>
        );
    }

    const chat = await findOrCreateChat(profile.id, params.userId);

    if (!chat) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <p>No chat found or created.</p>
            </div>
        );
    }

    // Corrected logic to determine the other member
    const otherMember =
        profile.id === chat.memberOneProfile.id ? chat.memberTwoProfile : chat.memberOneProfile;
    console.log('current profile', profile.name)
    console.log("Other member", otherMember.name);

    return (
        <>
            <ChatHeader
                imgUrl={otherMember?.imageUrl}
                name={otherMember?.name}
                id={otherMember?.id}
            ></ChatHeader>
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <ChatComponent
                    chat={chat}
                    currentUser={profile}
                    otherUser={otherMember}
                />

            </div>
        </>
    );
};

export default Chatpage;
