"use client"

import * as React from "react"
import {ModeToggle} from "@/components/Theme/theme-toggle"
import Nav from "@/components/Header/nav/Nav";

export default function Header() {
    return (
        <>
            <header className="py-5 xl:py-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div/>
                    <Nav/>
                    <div className="hidden md:block">
                        <ModeToggle/>
                    </div>
                </div>
            </header>
        </>
    )
}