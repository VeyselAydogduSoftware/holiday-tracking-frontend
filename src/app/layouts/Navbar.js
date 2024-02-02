import React, {useEffect} from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation'
export default function Navbar() {

    const pathname = usePathname()

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/home" className={`${pathname === '/home' ? 'active' : ''}`} >AKTARIM</Link>
                </li>
                <li>
                    <Link href="/calendar" className={`${pathname === '/calendar' ? 'active' : ''}`}>TAKVİM</Link>
                </li>
            </ul>
        </nav>
    );
}