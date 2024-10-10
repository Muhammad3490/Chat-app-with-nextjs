"use client";
import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import { v4 as uuidv4 } from "uuid";
import MessageBubble from "./message-bubble";
import { Button } from "../ui/button";
import { Send, Smile } from "lucide-react";
import { Input } from "../ui/input";
import EmojiPicker from "emoji-picker-react";
import DropDownComponent from "../Drop-down";

const Chat = ({ chat, currentUser, otherUser }) => {
    const [messages, setMessages] = useState([]); // State for messages
    const [newMessage, setNewMessage] = useState(""); // State for new message input
    const socket = useSocket("https://socket-server-production-98d8.up.railway.app"); // Connect to the Socket.IO server

    useEffect(() => {
        if (!socket) return;

        socket.emit("join_chat", chat.id); // Emit event to join the chat

        const handlePreviousMessages = (prevMessages) => {
            setMessages((existingMessages) => {
                const combinedMessages = [...existingMessages];

                prevMessages.forEach((msg) => {
                    if (!combinedMessages.some((m) => m.id === msg.id)) {
                        combinedMessages.push(msg); // Avoid duplicates
                    }
                });

                return combinedMessages; // Update messages state
            });
        };

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => {
                const exists = prevMessages.some((msg) => msg.id === message.id);
                if (!exists) {
                    return [...prevMessages, message]; // Add new message if it doesn't exist
                }
                return prevMessages; // Return previous messages if it already exists
            });
        };

        // Socket event listeners
        socket.on("previous_messages", handlePreviousMessages);
        socket.on("receive_message", handleReceiveMessage);

        return () => {
            // Cleanup function to remove event listeners
            socket.off("previous_messages", handlePreviousMessages);
            socket.off("receive_message", handleReceiveMessage);
            socket.emit("leave_chat", chat.id); // Leave the chat room when unmounted
        };
    }, [socket, chat.id]); // Dependency array includes chat.id

    const sendMessage = () => {
        if (newMessage.trim() === "") return; // Prevent sending empty messages

        // Generate a unique ID for the message
        const messageId = uuidv4(); // Use UUID for message ID

        const messageData = {
            id: messageId,
            content: newMessage,
            createdAt: new Date(),
            senderId: currentUser.id,
            receiverId: otherUser.id,
            chatId: chat.id,
        };

        // Emit the message to the server
        socket.emit("send_message", messageData);

        // Optimistically update the UI
        setMessages((prevMessages) => {
            const exists = prevMessages.some((msg) => msg.id === messageId);
            if (!exists) {
                return [...prevMessages, messageData]; // Add new message if it doesn't exist
            }
            return prevMessages; // Return previous messages if it already exists
        });

        setNewMessage(""); // Clear the input field
    };

    return (
        <>
            <div className="w-full h-auto px-2 lg:px-5 py-20 bg-neutral-200 dark:bg-slate-900 overflow-y-scroll">
                <div>
                    {messages.map((msg) => (
                        <MessageBubble
                            key={msg.id}
                            name={msg.senderId === currentUser.id ? currentUser.name : otherUser.name}
                            author={msg.senderId === currentUser.id ? "current" : "other"}
                            imgUrl={msg.senderId === currentUser.id ? currentUser.imageUrl : otherUser.imageUrl}
                            content={msg.content}
                            created_at={msg.createdAt}
                        />
                    ))}
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
                    trigger={<Smile />}
                />
                <Button onClick={sendMessage} size={"icon"} className="rounded-lg">
                    <Send />
                </Button>
            </div>
        </>
    );
};

export default Chat;
