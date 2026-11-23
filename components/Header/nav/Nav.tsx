"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import LocaleSwitcher from "@/components/Header/LocaleSwitcher";
import { ModeToggle } from "@/components/Theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getLocalizedPathname, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface NavProps {
    locale: Locale;
    labels: Dictionary["nav"];
    theme: Dictionary["theme"];
}

export default function Nav({ locale, labels, theme }: NavProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const links = [
        { href: getLocalizedPathname(locale), label: labels.home },
        { href: getLocalizedPathname(locale, "/projects"), label: labels.projects },
        { href: getLocalizedPathname(locale, "/about"), label: labels.about },
        { href: getLocalizedPathname(locale, "/contact"), label: labels.contact },
    ];

    const navLinks = links.map(({ href, label }) => (
        <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline"
            onClick={() => setIsOpen(false)}
        >
            {label}
        </Link>
    ));

    return (
        <div className="flex items-center gap-2 md:gap-4">
            <nav aria-label={labels.primary} className="mr-2 hidden items-center gap-4 md:flex lg:mr-4 lg:gap-6">
                {navLinks}
            </nav>
            <LocaleSwitcher currentLocale={locale} label={labels.language} />
            <ModeToggle labels={theme} />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="h-11 px-2 shadow-none hover:bg-card hover:text-foreground md:hidden">
                        {labels.menu}
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="right"
                    aria-describedby={undefined}
                    className="w-72 max-w-full border-border shadow-none data-[state=closed]:duration-150 data-[state=open]:duration-150 [&>button.absolute]:hidden"
                >
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                        <SheetTitle>{labels.menu}</SheetTitle>
                        <SheetClose asChild>
                            <Button variant="outline" className="h-11 shadow-none hover:bg-card hover:text-foreground">
                                {labels.close}
                            </Button>
                        </SheetClose>
                    </div>
                    <nav aria-label={labels.primary} className="mt-4 flex flex-col items-start gap-2">
                        {navLinks}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
