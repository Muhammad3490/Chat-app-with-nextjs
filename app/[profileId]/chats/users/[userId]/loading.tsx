
import { Loader } from "lucide-react";

const LoadingPage = () => {


    return (
        <>
        <div className="w-screen h-screen flex justify-center items-center bg-primary dark:bg-secondary">
            <Loader className="animate-spin"/>
        </div>
        </>)
}

export default LoadingPage;
