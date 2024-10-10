import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// Wrap PrismaClient initialization in a try-catch block for error handling
let prismaClient: PrismaClient;

try {
    prismaClient = new PrismaClient();
} catch (error) {
    console.error("Error initializing Prisma Client:", error);
    throw new Error("Failed to initialize Prisma Client");
}

export const db = globalThis.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}
