import React from 'react'
import { Loader } from 'lucide-react'
const Page = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <p className='text-4xl font-bold py-5'>Welcome to Banter</p>
      <Loader className='animate-spin h-20 w-20'/>
    </div>
  )
}

export default Page
