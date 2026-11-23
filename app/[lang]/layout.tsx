import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, locales, type Locale } from "@/lib/i18n/config";

import "@/app/globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

const localeMap: Record<Locale, string> = {
    en: "en_US",
    fr: "fr_FR",
};

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
    params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
    const { lang } = await params;
    const locale = hasLocale(lang) ? lang : locales[0];
    const dictionary = getDictionary(locale);

    return {
        metadataBase: new URL("https://anthonyrol.me"),
        title: {
            default: dictionary.metadata.title,
            template: "%s | Anthony Rolland",
        },
        description: dictionary.metadata.description,
        keywords: [
            "Anthony Rolland",
            "back-end developer",
            "software engineer",
            "portfolio",
            "IT student",
            "AI",
            "full-stack developer",
            "developer portfolio",
        ],
        authors: [{ name: "Anthony Rolland", url: "https://anthonyrol.me" }],
        creator: "Anthony Rolland",
        publisher: "Anthony Rolland",
        icons: {
            icon: "/favicon.ico",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            type: "website",
            locale: localeMap[locale],
            url: `https://anthonyrol.me/${locale}`,
            siteName: dictionary.metadata.siteName,
            title: dictionary.metadata.title,
            description: dictionary.metadata.description,
            images: [
                {
                    url: "/images/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: dictionary.metadata.ogImageAlt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: dictionary.metadata.title,
            description: dictionary.metadata.description,
            images: ["/images/og-image.png"],
        },
    };
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { lang } = await params;

    if (!hasLocale(lang)) {
        notFound();
    }

    const dictionary = getDictionary(lang);
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://anthonyrol.me/#person",
                name: "Anthony Rolland",
                url: "https://anthonyrol.me",
                jobTitle: dictionary.metadata.jobTitle,
                description: dictionary.metadata.personDescription,
                sameAs: [
                    "https://github.com/anthonyroldev",
                    "https://www.linkedin.com/in/anthony-rolland-info/",
                ],
            },
            {
                "@type": "WebSite",
                "@id": "https://anthonyrol.me/#website",
                url: `https://anthonyrol.me/${lang}`,
                name: dictionary.metadata.siteName,
                description: dictionary.metadata.websiteDescription,
                publisher: {
                    "@id": "https://anthonyrol.me/#person",
                },
                inLanguage: lang,
            },
        ],
    };

    return (
        <html lang={lang} suppressHydrationWarning>
            <body className={inter.className + " flex min-h-screen flex-col bg-background text-foreground antialiased"}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <a
                        href="#main-content"
                        className="sr-only z-50 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
                    >
                        {dictionary.nav.skip}
                    </a>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                    <Header locale={lang} dictionary={dictionary} />
                    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-275 flex-1 px-4 md:px-8">
                        {children}
                    </main>
                    <Footer label={dictionary.footer.madeBy} />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
