'use client'

import Firebase from "@/lib/firebase";
export default function ({ children }: { children: React.ReactNode }) {
    Firebase.init()
    return children
}