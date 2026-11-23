"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { replaceLocaleInPathname, type Locale } from "@/lib/i18n/config";

interface LocaleSwitcherProps {
    currentLocale: Locale;
    label: string;
}

export default function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
    const pathname = usePathname() || "/";
    const targetLocale = currentLocale === "en" ? "fr" : "en";

    return (
        <Link
            href={replaceLocaleInPathname(pathname, targetLocale)}
            hrefLang={targetLocale}
            aria-label={label}
            className={buttonVariants({
                variant: "outline",
                className: "h-11 min-w-11 px-2 font-mono text-label shadow-none hover:bg-card hover:text-foreground",
            })}
        >
            {targetLocale.toUpperCase()}
        </Link>
    );
}
