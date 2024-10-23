import { ChevronRight } from "lucide-react"
import { ReactNode, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface MenuItemProps {
    name: ReactNode
    icon?: ReactNode
    href?: string
    children?: ReactNode
    count?: number, // use to for indicating
}

export default function MenuItem({ name, icon, href, children, count }: MenuItemProps) {

    const [isActive, toggleActive] = useState(false)

    return <li className={`group ${isActive ? 'active' : ''}`}>

        <Link href={href ?? '#'} className="text-sm p-2 cursor-pointer flex items-center justify-between rounded-sm hover:bg-gray-100" onClick={() => toggleActive(!isActive)}>
            <div className="flex gap-2">{icon}{name}</div>
            <div className="flex items-center gap-2">
                {count! > 0 && <Badge variant="destructive">{count}</Badge>}
                {children && <ChevronRight className="w-4 h-4 transition group-[.active]:rotate-90" />}
            </div>
        </Link>

        {children && <ul className="submenu ml-4 mt-2 px-2 border-l-2 hidden group-[.active]:block">{children}</ul>}

    </li>


    // return (
    //     <li className="cursor-pointer flex gap-2 items-center text-sm p-2 rounded-sm hover:bg-gray-100">
    //         {icon}
    //         {name}
    //         {children && <ChevronRight className="w-4 h-4 ml-auto" />}
    //     </li>
    // )
}
