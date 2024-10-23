import { useLayout } from "@/layouts/app"

export default function () {

    const { isSidebarOpen } = useLayout()
    return <aside className={`${isSidebarOpen ? 'active' : ''} bg-gray-100`}>
        <ul className="py-3 p-2">
            <li className="cursor-pointer text-sm p-2 rounded-sm hover:bg-gray-200">Home</li>
            <li className="cursor-pointer text-sm p-2 rounded-sm hover:bg-gray-200">Dashboard</li>
            <li className="cursor-pointer text-sm p-2 rounded-sm hover:bg-gray-200">Orders</li>
        </ul>
    </aside>
}
