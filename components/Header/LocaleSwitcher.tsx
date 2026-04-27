"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    locales,
    replaceLocaleInPathname,
    type Locale,
} from "@/lib/i18n/config";

interface LocaleSwitcherProps {
    currentLocale: Locale;
    label: string;
}

const localeLabels: Record<Locale, string> = {
    en: "EN",
    fr: "FR",
};

export default function LocaleSwitcher({
    currentLocale,
    label,
}: LocaleSwitcherProps) {
    const pathname = usePathname() || "/";

    return (
        <div className="flex items-center gap-2">
            <span className="sr-only">{label}</span>
            <div className="flex items-center rounded-xl border border-slate-200 bg-background/60 p-1 dark:border-slate-700">
                {locales.map((locale) => {
                    const isActive = locale === currentLocale;

                    return (
                        <Link
                            key={locale}
                            href={replaceLocaleInPathname(pathname, locale)}
                            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                                isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {localeLabels[locale]}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
