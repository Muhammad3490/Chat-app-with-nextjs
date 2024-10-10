import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




interface PageProps {
    params: { userId: string }
}

const UserProfilePage = async ({ params }: PageProps) => {

    const profile = await db.profile.findUnique({
        where: {
            id: params.userId
        }
    })
    return (
        <div className="w-screen h-full flex justify-center items-center flex-col">
            <div className="lg:w-[40vw] w-full">
                <div className="py-5 px-2">
                    <Avatar>
                        <AvatarImage src={profile?.imageUrl ||"https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;