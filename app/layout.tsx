import type { Metadata } from "next";
import Store from '@/providers/store'
import "./globals.css";


export const metadata: Metadata = {
  title: "Nexis",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Store>
          {children}
        </Store>
      </body>
    </html>
  );
}
