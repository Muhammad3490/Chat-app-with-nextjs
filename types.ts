

;
// src/types/types.ts

export type Profile = {
    id: string; // Unique identifier for the profile
    userId: string; // Unique user ID
    name: string; // Name of the user
    imageUrl?: string; // Optional URL for the user's profile image
    email: string; // Unique email for the user
    createdAt: Date; // Timestamp for when the profile was created
    updatedAt: Date; // Timestamp for when the profile was last updated
    memberOneChats: Chat[]; // Chats where this profile is member one
    memberTwoChats: Chat[]; // Chats where this profile is member two
    sentMessages: Message[]; // Messages sent by this profile
    receivedMessages: Message[]; // Messages received by this profile
};

export type Message = {
    id: string; // Unique identifier for the message
    content: string; // The content of the message
    createdAt: Date; // Timestamp for when the message was created
    chatId: string; // ID of the chat this message belongs to
    senderId: string; // ID of the sender profile
    receiverId: string; // ID of the receiver profile
    chat: Chat; // The chat this message belongs to
    sender?: Profile; // The profile of the sender
    receiver?: Profile; // The profile of the receiver
};

export type Chat = {
    id: string; // Unique identifier for the chat
    memberOne: string; // ID of the first member (Profile)
    memberTwo: string; // ID of the second member (Profile)
    memberOneProfile: Profile; // Profile of the first member
    memberTwoProfile: Profile; // Profile of the second member
    messages: Message[]; // Messages associated with this chat
    createdAt: Date; // Timestamp for when the chat was created
    updatedAt: Date; // Timestamp for when the chat was last updated
};

export type ChatWithProfiles = Chat & {
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
}

// Socket Types
export interface SocketMessage {
    chatId: string; // ID of the chat
    senderId: string; // ID of the sender
    receiverId: string; // ID of the receiver
    content: string; // Content of the message
    createdAt: Date; // Timestamp for when the message was created
    id: string; // Unique identifier for the message
}

export interface SocketEvents {
    join_chat: (chatId: string) => void; // Event for joining a chat
    leave_chat: (chatId: string) => void; // Event for leaving a chat
    send_message: (message: SocketMessage) => void; // Event for sending a message
    receive_message: (message: Message) => void; // Event for receiving a message
    previous_messages: (messages: Message[]) => void; // Event for receiving previous messages
}