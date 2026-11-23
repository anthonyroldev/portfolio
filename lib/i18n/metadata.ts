import type { Metadata } from "next";

import { defaultLocale, getLocalizedPathname, hasLocale, locales } from "@/lib/i18n/config";

export function getPageAlternates(lang: string, pathname: string): Metadata {
    const locale = hasLocale(lang) ? lang : defaultLocale;

    return {
        alternates: {
            canonical: getLocalizedPathname(locale, pathname),
            languages: Object.fromEntries(
                locales.map((language) => [language, getLocalizedPathname(language, pathname)]),
            ),
        },
    };
}
