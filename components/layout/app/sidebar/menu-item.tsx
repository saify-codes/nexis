import { ChevronRight } from "lucide-react"
import { ReactNode, useState } from "react"
import Link from "next/link"

interface MenuItemProps {
    name: ReactNode
    icon?: ReactNode
    link?: string
    children?: ReactNode
}

export default function MenuItem({ name, icon, link, children }: MenuItemProps) {

    const [isActive, toggleActive] = useState(false)

    return <li className={`group ${isActive ? 'active' : ''}`}>
        <Link href={link ?? '#'} className="text-sm p-2 cursor-pointer flex gap-2 items-center rounded-sm hover:bg-gray-100" onClick={() => toggleActive(!isActive)}>
            {icon}
            {name}
            {children && <ChevronRight className="w-4 h-4 ml-auto transition group-[.active]:rotate-90" />}
        </Link>


        {children && <ul className="submenu ml-4 px-2 py-1 border-l-2 hidden group-[.active]:block">{children}</ul>}

    </li>


    // return (
    //     <li className="cursor-pointer flex gap-2 items-center text-sm p-2 rounded-sm hover:bg-gray-100">
    //         {icon}
    //         {name}
    //         {children && <ChevronRight className="w-4 h-4 ml-auto" />}
    //     </li>
    // )
}
