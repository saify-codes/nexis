import { useLayout } from "@/layouts/app"
import { ChevronRight, Home, LayoutDashboard, Package, Settings, Settings2 } from "lucide-react"
import Menu from "./menu"
import MenuItem from "./menu-item"
import SubMenuItem from "./sub-menu-item"

export default function () {

    const { isSidebarOpen } = useLayout()
    return <aside className={`${isSidebarOpen ? 'active' : ''}`}>
        <Menu>
            
            <MenuItem name="Home" icon={<Home className="w-4 h-4" />}>
                <SubMenuItem name="op" />
            </MenuItem>

        </Menu>
    </aside>
}
