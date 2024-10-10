
import { Loader } from "lucide-react";

const LoadingPage = () => {
    const messages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2]; // Corrected the type annotation

    return (
        <>
        <div className="w-screen h-screen flex justify-center items-center bg-primary dark:bg-secondary">
            <Loader className="animate-spin"/>
        </div>
        </>)
}

export default LoadingPage;
