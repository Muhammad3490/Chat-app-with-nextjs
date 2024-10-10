import { Loader } from "lucide-react";

const Page = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <p className="text-2xl font-bold py-5">Loading your chats</p>
            <Loader className="animate-spin"/>
        </div>
      );
}
 
export default Page;