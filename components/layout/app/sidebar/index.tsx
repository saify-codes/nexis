import { useLayout } from "@/layouts/app"
import { Box, Home, LayoutDashboard, Notebook, Package, ShoppingBag } from "lucide-react"
import Menu from "./menu"
import MenuItem from "./menu-item"
import SubMenuItem from "./sub-menu-item"

export default function () {

    const menuItems = [
        { name: 'Home', icon: <Home className="w-4 h-4" />, href: '/' },
        { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/dashboard' },
        { name: 'Orders', icon: <ShoppingBag className="w-4 h-4" />, href: '/orders', count: 32 },
        { name: 'Inventory', icon: <Box className="w-4 h-4" />, href: '/inventory' },
        {
            name: 'Catalogue',
            icon: <Notebook className="w-4 h-4" />,
            subItems: [
                { name: 'Item', href: '/item' },
                { name: 'Categories', href: '/item' },
                { name: 'Sizes', href: '/item' },
                { name: 'Offers', href: '/item' },
                { name: 'Vouchers', href: '/item' },
                { name: 'Indicators', href: '/item' },
            ],
        },
    ]

    const { isSidebarOpen } = useLayout()
    return <aside className={`bg-white ${isSidebarOpen ? 'active' : ''}`}>
        <Menu>
            {
                menuItems.map(menuItem =>
                    <MenuItem
                        name={menuItem.name}
                        icon={menuItem.icon}
                        href={menuItem.href}
                        count={menuItem.count}
                    >
                        {
                            menuItem.subItems?.map(subMenuItem => <SubMenuItem name={subMenuItem.name} href={subMenuItem.href} />)
                        }
                    </MenuItem>)
            }
        </Menu>
    </aside>
}
