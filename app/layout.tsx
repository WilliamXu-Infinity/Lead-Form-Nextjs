"use client"
import localFont from "next/font/local";
import "./globals.css";
import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from "../lib/store"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
		storeRef.current = makeStore()
	}

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            {/* <main>
                <nav>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/LeadTable">
                        LeadTable
                    </Link>
                </nav>
            </main> */}

            <Provider store={storeRef.current}>{children}</Provider>
            </body>
        </html>
  );
}
