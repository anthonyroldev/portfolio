import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://anthonyrol.me"),
    title: {
        default: "ROLLAND Anthony | Back-End Developer & Software Engineer",
        template: "%s | ROLLAND Anthony",
    },
    description:
        "IT Student and Back-End Developer specializing in software engineering. Explore my portfolio showcasing projects, skills, and expertise in building robust applications.",
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
        locale: "fr_FR",
        url: "https://anthonyrol.me",
        siteName: "Anthony ROLLAND - Portfolio",
        title: "ROLLAND Anthony | Back-End Developer & Software Engineer",
        description:
            "IT Student and Back-End Developer specializing in software engineering. Explore my portfolio showcasing projects, skills, and expertise.",
        images: [
            {
                url: "/images/og-image.png", // Create this image (1200x630px recommended)
                width: 1200,
                height: 630,
                alt: "Anthony ROLLAND - Back-End Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ROLLAND Anthony | Back-End Developer & Software Engineer",
        description:
            "IT Student and Back-End Developer specializing in software engineering. Explore my portfolio.",
        images: ["/images/og-image.png"],
    },
    alternates: {
        canonical: "https://anthonyrol.me",
    },
};

// JSON-LD Structured Data
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://anthonyrol.me/#person",
            name: "Anthony ROLLAND",
            url: "https://anthonyrol.me",
            jobTitle: "Back-End Developer & Software Engineer",
            description:
                "IT Student and Back-End Developer specializing in software engineering.",
            sameAs: [
                "https://github.com/anthonyroldev",
                "https://www.linkedin.com/in/anthony-rolland-info/"
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://anthonyrol.me/#website",
            url: "https://anthonyrol.me",
            name: "Anthony ROLLAND - Portfolio",
            description: "Back-End Developer & Software Engineer Portfolio",
            publisher: {
                "@id": "https://anthonyrol.me/#person",
            },
            inLanguage: "fr-FR",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                </ThemeProvider>
                <Footer />
            </body>
        </html>
    );
}
