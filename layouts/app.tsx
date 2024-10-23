import Navbar from "@/components/layout/app/navigation";
import Sidebar from "@/components/layout/app/sidebar";
import Footer from "@/components/layout/app/footer";
import { createContext, useState, ReactNode, useContext } from "react";
import './app.css';

// Create a more meaningful context name
const LayoutContext = createContext<{
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
} | null>(null);

// Create a custom hook for consuming the layout context easily
export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};

export default function Layout({ children }: { children: ReactNode }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

    return (
        <div id="app-layout">
            <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
                <Navbar />
                <Sidebar />
                <main className="p-4 bg-yellow-500">
                    {children}
                </main>
                <Footer />
            </LayoutContext.Provider>
        </div>
    );
}
