import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
    return <ul className="px-2">
        {children}
    </ul>
}
