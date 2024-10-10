import { UserButton } from '@clerk/nextjs'
import { User } from 'lucide-react'
import Link from 'next/link'
import { currentProfile } from '@/lib/current-profile'
const Navbar = async () => {
    const profile = await currentProfile();


    return (
        <div className='top-0 fixed w-full h-auto border-b border-neutral-200 dark:border-neutral-800 bg-primary dark:bg-secondary lg:flex hidden justify-between items-center py-2 z-20 px-2'>
            <p className='font-semibold'>Chats</p>
            <div className='space-x-2 flex'>
                <Link href={`/users/${profile?.id}`}>
                    <User />
                </Link>
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar
