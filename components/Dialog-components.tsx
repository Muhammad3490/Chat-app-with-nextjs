"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface PageProps {
    trigger: React.ReactNode | string
    title: string
    desp: string
    content: React.ReactNode | string
}

const DialogComponent = ({ trigger, title, desp, content }: PageProps) => {
    return (
        <>
            <Dialog>
                <DialogTrigger>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{desp}</DialogDescription>
                    </DialogHeader>
                    {content}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DialogComponent;
