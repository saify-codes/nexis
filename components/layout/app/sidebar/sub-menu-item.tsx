import Link from "next/link"

interface SubMenuItemProps {
    name: string
    href?: string
}
export default function ({ name, href }: SubMenuItemProps) {
    return <li className="text-sm p-2 cursor-pointer flex gap-2 items-center rounded-sm  hover:bg-gray-100">
        <Link href={href ?? '#'}>{name}</Link>
    </li>
}
