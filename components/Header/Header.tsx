"use client"

import Nav from "@/components/Header/nav/Nav";
import { ModeToggle } from "@/components/Theme/theme-toggle";

export default function Header() {
    return (
        <header className="py-4 md:py-6 lg:py-8 sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-transparent">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div />
                <Nav />
                <div className="hidden md:block">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}