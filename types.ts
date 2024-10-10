import { Chat } from "@prisma/client";

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
