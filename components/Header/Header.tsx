"use client"

import Nav from "@/components/Header/nav/Nav";
import { ModeToggle } from "@/components/Theme/theme-toggle";

export default function Header() {
    return (
        <>
            <header className="py-5 xl:py-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div/>
                    <Nav/>
                    <div className="hidden md:block mr-4">
                        <ModeToggle/>
                    </div>
                </div>
            </header>
        </>
    )
}