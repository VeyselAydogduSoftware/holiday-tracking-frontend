'use client'
import {Inter} from "next/font/google";
import Header from "@/app/layouts/Header";
import Navbar from "@/app/layouts/Navbar";
import "@/styles/css/global.css";
import {HelperProvider} from "@/contexts/HelperContext";
import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
    return (
        <HelperProvider>
            <html lang="tr">
                <Header/>
                <body className={inter.className}>
                    <Navbar/>
                        <div className="main-content">
                            {children}
                        </div>
                    </body>
            </html>
        </HelperProvider>
    );
}