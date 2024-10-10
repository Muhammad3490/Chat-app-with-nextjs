import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react"; // Importing Check icon
import { Input } from "./ui/input";

interface Props {
    link: string;
}

export default function InviteLink({ link }: Props) {
    const [copied, setCopied] = useState(false); // State to track if the link is copied

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link); // Copy link to clipboard
            setCopied(true); // Set copied state to true
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        } catch (error) {
            console.error("Failed to copy: ", error);
        }
    };

    return (
        <div className="flex flex-col w-full space-x-3">
            <Label>Invite link</Label>
            <div className="flex space-x-2">
                <Input value={link} readOnly autoFocus={false}/> {/* Make input read-only */}
                <Button size="icon" onClick={handleCopy}>
                    {copied ? <Check /> : <Copy />} {/* Change icon based on copied state */}
                </Button>
            </div>
        </div>
    );
}
