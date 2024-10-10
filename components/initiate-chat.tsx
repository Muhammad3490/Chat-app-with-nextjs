import { currentProfile } from "@/lib/current-profile";
import { MessageCircle, User } from "lucide-react";
interface PageProps {
    memberTwo: {
        name: string,
        imageUrl: string,
        email: string,
        id: string

    }
}
const InitiateChat = async ({ memberTwo }: PageProps) => {
    const profile = await currentProfile();
    const memberOneId = profile?.id
    return (
        <div className="flex">
            <img
                src={memberTwo?.imageUrl || "/default-avatar.png"}
                alt={memberTwo?.name}
                className="w-10 h-10 rounded-full mr-4"
            />
            <div>
                <p className="font-semibold">{memberTwo?.name}</p>
                <p className="text-sm text-gray-600">{memberTwo?.email}</p>
            </div>
        </div>

    );
}

export default InitiateChat;