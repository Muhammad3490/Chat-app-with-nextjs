import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
    // Get the current user from Clerk
    const user = await currentUser();
    if (!user) {
        // If no user is found, redirect them to sign in
        return auth().redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id, // Ensure `userId` is the correct field in your schema
        }
    });

    // If the profile exists, return it
    if (profile) return profile;

    const newProfile = await db.profile.create({
        data: {
            userId: user.id, // Updated the field to match the schema
            name: `${user.firstName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress // Correct the field for accessing email
        }
    });
    return newProfile;
};
