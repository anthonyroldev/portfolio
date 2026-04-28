import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, locales, type Locale } from "@/lib/i18n/config";

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
            template: "%s | ROLLAND Anthony",
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
        authors: [{ name: "Anthony ROLLAND", url: "https://anthonyrol.me" }],
        creator: "Anthony ROLLAND",
        publisher: "Anthony ROLLAND",
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
                name: "Anthony ROLLAND",
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
                inLanguage: localeMap[lang],
            },
        ],
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div lang={lang} className="min-h-screen bg-background text-foreground">
                <Header locale={lang} dictionary={dictionary} />
                <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
                    <div className="w-full">
                        {children}
                        <Analytics />
                    </div>
                </main>
                <Footer label={dictionary.footer.madeBy} />
            </div>
        </ThemeProvider>
    );
}
