import type { Metadata } from "next";
import Store from '@/providers/store'
import Firebase from "@/providers/firebase";
import "./globals.css";


export const metadata: Metadata = {
  title: "Nexis",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body>
        <Firebase>
          <Store>
            {children}
          </Store>
        </Firebase>
      </body>
    </html>
  );
}
