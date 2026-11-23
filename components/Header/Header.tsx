import Link from "next/link";

import Nav from "@/components/Header/nav/Nav";
import { getLocalizedPathname, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeaderProps {
    locale: Locale;
    dictionary: Dictionary;
}

export default function Header({ locale, dictionary }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 h-(--header-height) border-b border-border bg-background">
            <div className="mx-auto flex h-full max-w-275 items-center justify-between gap-2 px-4 md:px-8">
                <Link
                    href={getLocalizedPathname(locale)}
                    className="inline-flex min-h-11 items-center text-sm font-semibold hover:text-accent md:text-base"
                >
                    Anthony Rolland
                </Link>
                <Nav locale={locale} labels={dictionary.nav} theme={dictionary.theme} />
            </div>
        </header>
    );
}
