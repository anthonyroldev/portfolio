import { MetadataRoute } from "next";

import { getLocalizedPathname, locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://anthonyrol.me";
    const lastModified = new Date();
    const pages = ["/", "/about", "/projects", "/contact"];

    return locales.flatMap((locale) =>
        pages.map((page) => ({
            url: `${baseUrl}${getLocalizedPathname(locale, page)}`,
            lastModified,
            changeFrequency: page === "/" ? "weekly" : "monthly",
            priority: page === "/" ? 1 : 0.8,
        })),
    );
}
