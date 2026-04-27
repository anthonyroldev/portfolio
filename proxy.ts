import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
    defaultLocale,
    getLocaleFromPathname,
    getLocalizedPathname,
    hasLocale,
    localeCookieName,
    type Locale,
} from "@/lib/i18n/config";

function getPreferredLocale(request: NextRequest): Locale {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;

    if (cookieLocale && hasLocale(cookieLocale)) {
        return cookieLocale;
    }

    const acceptLanguage = request.headers.get("accept-language");

    if (!acceptLanguage) {
        return defaultLocale;
    }

    const preferredLocales = acceptLanguage
        .split(",")
        .map((entry) => {
            const [locale, qualityValue] = entry.trim().split(";q=");

            return {
                locale: locale.toLowerCase(),
                quality: qualityValue ? Number(qualityValue) : 1,
            };
        })
        .filter(({ locale, quality }) => locale.length > 0 && !Number.isNaN(quality))
        .sort((left, right) => right.quality - left.quality)
        .map(({ locale }) => locale);

    for (const locale of preferredLocales) {
        const baseLocale = locale.split("-")[0];

        if (hasLocale(baseLocale)) {
            return baseLocale;
        }
    }

    return defaultLocale;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathnameLocale = getLocaleFromPathname(pathname);

    if (pathnameLocale) {
        const response = NextResponse.next();
        response.cookies.set(localeCookieName, pathnameLocale, { path: "/" });
        return response;
    }

    const locale = getPreferredLocale(request);
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = getLocalizedPathname(locale, pathname);

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(localeCookieName, locale, { path: "/" });

    return response;
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
