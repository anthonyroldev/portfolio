export const locales = ["en", "fr"] as const;

export const defaultLocale = "en";

export const localeCookieName = "NEXT_LOCALE";

export type Locale = (typeof locales)[number];

export function hasLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

export function getLocalizedPathname(locale: Locale, pathname = "/") {
    if (pathname === "/") {
        return `/${locale}`;
    }

    return `/${locale}${pathname}`;
}

export function removeLocaleFromPathname(pathname: string) {
    const segments = pathname.split("/");
    const locale = segments[1];

    if (!locale || !hasLocale(locale)) {
        return pathname || "/";
    }

    const nextPathname = `/${segments.slice(2).join("/")}`.replace(/\/+$/, "");

    return nextPathname || "/";
}

export function replaceLocaleInPathname(pathname: string, locale: Locale) {
    return getLocalizedPathname(locale, removeLocaleFromPathname(pathname));
}

export function getLocaleFromPathname(pathname: string) {
    const locale = pathname.split("/")[1];

    if (!locale || !hasLocale(locale)) {
        return null;
    }

    return locale;
}
