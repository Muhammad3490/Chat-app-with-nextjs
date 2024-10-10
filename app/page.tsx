import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {

  const profile = await initialProfile()

  if (profile) return redirect(`/${profile.id}/chats/`)

  return redirect('/')
}
