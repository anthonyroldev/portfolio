import LocaleSwitcher from "@/components/Header/LocaleSwitcher";
import Nav from "@/components/Header/nav/Nav";
import { ModeToggle } from "@/components/Theme/theme-toggle";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeaderProps {
    locale: Locale;
    dictionary: Dictionary;
}

export default function Header({ locale, dictionary }: HeaderProps) {
    return (
        <header className="py-4 md:py-6 lg:py-8 sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-transparent">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div />
                <Nav locale={locale} dictionary={dictionary} />
                <div className="hidden md:flex items-center gap-3">
                    <LocaleSwitcher currentLocale={locale} label={dictionary.nav.language} />
                    <ModeToggle labels={dictionary.theme} />
                </div>
            </div>
        </header>
    )
}
