// Assuming you have a Prisma client instance imported
import db  from "@/lib/db"; // Adjust the path as needed

const findChat = async (memberOneId: string, memberTwoId: string) => {
    try {
        const chat = await db.chat.findFirst({
            where: {
                OR: [
                    {
                        memberOne: memberOneId,
                        memberTwo: memberTwoId,
                    },
                    {
                        memberOne: memberTwoId,
                        memberTwo: memberOneId,
                    },
                ],
            },
            include:{
                memberOneProfile:true,
                memberTwoProfile:true
            }
        });

        return chat
    } catch (error) {
        console.error("Error finding chat:", error);
        throw new Error("Unable to find chat");
    }
};

export default findChat;

const createChat = async (memberOneId: string, memberTwoId: string) => {
    const newChat = await db.chat.create({
        data: {
            memberOne: memberOneId,
            memberTwo: memberTwoId
        },include:{
            memberOneProfile:true,
            memberTwoProfile:true
        }
    })
    if (newChat) return newChat;

    return null;
}

export const findOrCreateChat = async (memberOneId: string, memberTwoId: string) => {

    let chat = await findChat(memberOneId, memberTwoId) || await findChat(memberTwoId,memberOneId);

    if (!chat) {
        chat = await createChat(memberOneId, memberTwoId)
    }
    return chat;
}