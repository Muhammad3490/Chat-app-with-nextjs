"use client";
import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import { v4 as uuidv4 } from "uuid";
import { Chat as PrismaChat, Profile, Message } from "@prisma/client";
import MessageBubble from "./message-bubble";
import { Button } from "../ui/button";
import { Send, Smile } from "lucide-react";
import { Input } from "../ui/input";
import EmojiPicker from 'emoji-picker-react';
import DropDownComponent from "../Drop-down";
interface PageProps {
    chat: PrismaChat;
    currentUser: Profile;
    otherUser: Profile;
}

const Chat = ({ chat, currentUser, otherUser }: PageProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = useSocket("https://socket-server-production-98d8.up.railway.app"); // Connect to the Socket.IO server

    useEffect(() => {
        if (!socket) return;

        socket.emit("join_chat", chat.id);

        const handlePreviousMessages = (prevMessages: Message[]) => {
            setMessages((existingMessages) => {
                const combinedMessages = [...existingMessages];

                prevMessages.forEach((msg) => {
                    if (!combinedMessages.some((m) => m.id === msg.id)) {
                        combinedMessages.push(msg);
                    }
                });

                return combinedMessages;
            });
        };

        const handleReceiveMessage = (message: Message) => {
            setMessages((prevMessages) => {
                const exists = prevMessages.some((msg) => msg.id === message.id);
                if (!exists) {
                    return [...prevMessages, message];
                }
                return prevMessages;
            });
        };

        socket.on("previous_messages", handlePreviousMessages);
        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("previous_messages", handlePreviousMessages);
            socket.off("receive_message", handleReceiveMessage);
            socket.emit("leave_chat", chat.id); // Optional: Leave the chat room
        };
    }, [socket, chat.id]); // Dependency array includes chat.id

    const sendMessage = () => {
        if (newMessage.trim() === "") return; // Prevent sending empty messages

        // Generate a unique ID for the message
        const messageId = uuidv4(); // Use UUID

        const messageData: Message = {
            id: messageId,
            content: newMessage,
            createdAt: new Date(),
            senderId: currentUser.id,
            receiverId: otherUser.id,
            chatId: chat.id,
        };

        // Emit the message to the server
        socket.emit("send_message", {
            chatId: chat.id,
            senderId: currentUser.id,
            receiverId: otherUser.id,
            content: messageData.content,
            createdAt: messageData.createdAt,
            id: messageId,
        });

        // Optimistically update the UI
        setMessages((prevMessages) => {
            const exists = prevMessages.some((msg) => msg.id === messageId);
            if (!exists) {
                return [...prevMessages, messageData];
            }
            return prevMessages;
        });

        setNewMessage(""); // Clear the input field
    };

    return (
        <>
        <div className="w-full h-auto px-2 lg:px-5 py-20 bg-neutral-200 dark:bg-slate-900 overflow-y-scroll">
            <div>
                {messages.map((msg) =>
                    msg.senderId === currentUser.id ? (
                        <MessageBubble
                            key={msg.id}
                            name={currentUser.name}
                            author="current"
                            imgUrl={currentUser.imageUrl}
                            content={msg.content}
                            created_at={msg?.createdAt}
                        />
                    ) : (
                        <MessageBubble
                            key={msg.id}
                            name={otherUser.name}
                            author="other"
                            imgUrl={otherUser.imageUrl}
                            content={msg.content}
                        />
                    )
                )}
            </div>
        </div>
        <div className="flex bottom-0 fixed p-3 space-x-2 w-full px-2 lg:px-5 bg-secondary/70 z-20">
                <Input
                    type="text"
                    value={newMessage}
                    className="rounded-md bg-secondary/50 w-full border-neutral-500/50 flex justify-start px-3 h-auto overflow-y-scroll"
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <DropDownComponent
                    content={
                        <EmojiPicker
                            lazyLoadEmojis={true}
                            onEmojiClick={(emoji) =>
                                setNewMessage((prevMsg) => `${prevMsg}${emoji.emoji}`)
                            }
                        />
                    }
                    trigger={<Smile />} />
                <Button onClick={sendMessage} size={"icon"} className="rounded-lg">
                    <Send />
                </Button>
            </div>
        </>
    );
};

export default Chat;
