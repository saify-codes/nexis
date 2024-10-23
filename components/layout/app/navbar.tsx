import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideGanttChart, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Auth } from "@/utils/auth"
import { useLayout } from "@/layouts/app"

export default function () {

    const { isSidebarOpen, toggleSidebar } = useLayout()
    return <nav className="flex items-center justify-between px-5">

        <button className="lg:invisible" onClick={toggleSidebar}>
            {
                isSidebarOpen ?
                    <ChevronLeft className="h-6 w-6" />
                    :
                    <LucideGanttChart className="h-6 w-6" />
            }
        </button>

        <div className="flex items-center gap-4">
            <Input type="search" placeholder="search..." />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="m-4">
                    <DropdownMenuLabel>{Auth.user()?.email}</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button>Logout</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>
}
