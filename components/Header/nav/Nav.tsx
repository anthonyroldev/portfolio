'use client'

import Link from "next/link"
import {usePathname} from "next/navigation"
import {useState} from "react"
import {Menu} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import Image from "next/image"
import {ModeToggle} from "@/components/Theme/theme-toggle";

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

    const NavLink = ({href, label, icon}: { href: string, label: string, icon: string }) => (
        <Link
            href={href}
            className={`${
                href === pathname
                    ? "text-accent border-b-2 border-accent"
                    : "text-foreground"
            } capitalize font-medium hover:text-accent transition-all duration-150 flex items-center gap-2 py-2`}
            onClick={() => setIsOpen(false)}
        >
            <Image src={icon} alt={label} width={20} height={20}/>
            {label}
        </Link>
    )

    return (
        <nav className="flex items-center justify-between p-4 bg-background">
            <div className="hidden md:flex gap-6">
                {links.map((link) => (
                    <NavLink key={link.href} {...link} />
                ))}
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="icon">
                        <Menu/>
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-4 mt-8">
                        {links.map((link) => (
                            <NavLink key={link.href} {...link} />
                        ))}
                    </div>
                    <div className="mt-6">
                        <ModeToggle/>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default Nav