'use client'

import { ModeToggle } from "@/components/Theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
    {
        href: '/',
        label: 'Accueil',
        icon: '/icons/home.svg',
    },
    {
        href: '/projects',
        label: 'Projets',
        icon: '/icons/projects.svg',
    },
    {
        href: '/about',
        label: 'A propos',
        icon: '/icons/about.svg',
    },
    {
        href: '/contact',
        label: 'Contact',
        icon: '/icons/contact.svg',
    },
    {
        href: '/cv.pdf',
        label: 'CV',
        icon: '/icons/cv_icon.png',
    }
]

const Nav = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const NavLink = ({ href, label, icon, mobile = false }: { href: string, label: string, icon: string, mobile?: boolean }) => (
        <Link
            href={href}
            className={`${
                href === pathname
                    ? "text-accent border-b-2 border-accent"
                    : "text-foreground hover:text-accent"
            } capitalize font-medium transition-all duration-150 flex items-center gap-2 ${
                mobile ? "py-3 min-h-11" : "py-2"
            }`}
            onClick={() => setIsOpen(false)}
        >
            <Image 
                src={icon} 
                alt={label} 
                width={mobile ? 24 : 20} 
                height={mobile ? 24 : 20}
            />
            {label}
        </Link>
    )

    return (
        <nav className="flex items-center justify-between p-3 md:p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-background/50 backdrop-blur-sm">
            <div className="hidden md:flex gap-6">
                {links.map((link) => (
                    <NavLink key={link.href} {...link} />
                ))}
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="icon" className="min-h-11 min-w-11">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-70 sm:w-80">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2 mt-6">
                        {links.map((link) => (
                            <NavLink key={link.href} {...link} mobile />
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-muted-foreground mb-3">Thème</p>
                        <ModeToggle />
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default Nav