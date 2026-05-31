'use client'

import LocaleSwitcher from "@/components/Header/LocaleSwitcher"
import { ModeToggle } from "@/components/Theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getLocalizedPathname, removeLocaleFromPathname, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { Menu } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface NavProps {
    locale: Locale;
    dictionary: Dictionary;
}

const Nav = ({ locale, dictionary }: NavProps) => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const currentPathname = removeLocaleFromPathname(pathname || "/")
    const links = [
        {
            href: "/",
            label: dictionary.nav.home,
            icon: "/icons/home.svg",
        },
        {
            href: "/projects",
            label: dictionary.nav.projects,
            icon: "/icons/projects.svg",
        },
        {
            href: "/about",
            label: dictionary.nav.about,
            icon: "/icons/about.svg",
        },
        {
            href: "/contact",
            label: dictionary.nav.contact,
            icon: "/icons/contact.svg",
        },
        {
            href: "/cv.pdf",
            label: dictionary.nav.resume,
            icon: "/icons/cv_icon.png",
        },
    ]

    const NavLink = ({ href, label, icon, mobile = false }: { href: string, label: string, icon: string, mobile?: boolean }) => (
        <Link
            href={href.startsWith("/") && href !== "/cv.pdf" ? getLocalizedPathname(locale, href) : href}
            className={`${
                href !== "/cv.pdf" && href === currentPathname
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
                className="dark:invert"
            />
            {label}
        </Link>
    )

    return (
        <nav className="flex items-center justify-end md:justify-between md:p-4 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-700 md:bg-background/50 md:backdrop-blur-sm">
            <div className="hidden md:flex gap-6">
                {links.map((link) => (
                    <NavLink key={link.href} {...link} />
                ))}
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="icon" className="min-h-11 min-w-11">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">{dictionary.nav.menu}</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-70 sm:w-80">
                    <SheetHeader>
                        <SheetTitle>{dictionary.nav.menu}</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2 mt-6">
                        {links.map((link) => (
                            <NavLink key={link.href} {...link} mobile />
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-muted-foreground mb-3">{dictionary.nav.language}</p>
                        <LocaleSwitcher currentLocale={locale} label={dictionary.nav.language} />
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-muted-foreground mb-3">{dictionary.nav.theme}</p>
                        <ModeToggle labels={dictionary.theme} />
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default Nav
