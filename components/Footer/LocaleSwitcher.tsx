"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

import { localeCookieName, replaceLocaleInPathname, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const languages = [
    { locale: "fr", label: "Français" },
    { locale: "en", label: "English" },
] as const;

let pendingSwitch: { destination: string; hash: string; scrollTop: number; previousClip: string | null } | undefined;

export default function LocaleSwitcher({ currentLocale, label }: { currentLocale: Locale; label: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const activeLink = useRef<HTMLAnchorElement>(null);
    const indicator = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const navigation = pendingSwitch;
        pendingSwitch = undefined;

        if (navigation?.destination === pathname + window.location.search) {
            if (navigation.hash) {
                // Adding the fragment after navigation avoids Next.js scrolling to its target.
                window.history.replaceState(window.history.state, "", navigation.destination + navigation.hash);
            }
            activeLink.current?.focus({ preventScroll: true });
            window.scrollTo(0, navigation.scrollTop);
            activeLink.current?.scrollIntoView({ block: "nearest", inline: "nearest" });

            const layer = indicator.current;
            if (layer && navigation.previousClip && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                // The locale layout remounts, so start from the previous segment's clip.
                layer.animate(
                    [{ clipPath: navigation.previousClip }, { clipPath: window.getComputedStyle(layer).clipPath }],
                    { duration: 150, easing: "ease-out" },
                );
            }
        }
    }, [pathname]);

    return (
        <nav aria-label={label} className="relative isolate grid w-fit grid-cols-2 rounded-lg border border-border text-sm font-medium">
            <div
                ref={indicator}
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute inset-0 z-10 grid grid-cols-2 bg-accent text-accent-foreground",
                    currentLocale === "fr"
                        ? "[clip-path:inset(0_50%_0_0_round_7px)]"
                        : "[clip-path:inset(0_0_0_50%_round_7px)]",
                )}
            >
                {languages.map(({ locale, label }) => (
                    <span key={locale} className="flex items-center justify-center px-3">{label}</span>
                ))}
            </div>
            {languages.map(({ locale, label }) => {
                const href = replaceLocaleInPathname(pathname, locale);

                return (
                    <Link
                        key={locale}
                        href={href}
                        lang={locale}
                        hrefLang={locale}
                        aria-current={locale === currentLocale ? "true" : undefined}
                        ref={locale === currentLocale ? activeLink : undefined}
                        prefetch={false}
                        scroll={false}
                        className="inline-flex h-9 scroll-my-2 items-center justify-center rounded-lg px-3 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                            const secure = window.location.protocol === "https:" ? "; Secure" : "";
                            document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
                        }}
                        onNavigate={(event) => {
                            event.preventDefault();
                            if (locale !== currentLocale) {
                                const { search, hash } = window.location;
                                const destination = href + search;
                                pendingSwitch = {
                                    destination,
                                    hash,
                                    scrollTop: window.scrollY,
                                    previousClip: indicator.current && window.getComputedStyle(indicator.current).clipPath,
                                };
                                router.push(destination, { scroll: false });
                            }
                        }}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
