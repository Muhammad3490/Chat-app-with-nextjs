import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropDownComponentProps {
    trigger: React.ReactNode,
    content: React.ReactNode,


}

const DropDownComponent = ({ trigger, content }: DropDownComponentProps) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    {content}
                </DropdownMenuContent>
            </DropdownMenu>

        </>

    );
}

export default DropDownComponent;