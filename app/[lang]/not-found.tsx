"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function NotFound() {
    const params = useParams<{ lang?: string }>();
    const locale = params.lang && hasLocale(params.lang) ? params.lang : defaultLocale;
    const dictionary = getDictionary(locale as Locale);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">404</h1>
            <p className="mt-4 text-xl text-muted-foreground md:text-2xl">
                {dictionary.notFound.description}
            </p>
            <Button asChild className="mt-8">
                <Link href={`/${locale}`}>{dictionary.notFound.backHome}</Link>
            </Button>
        </div>
    );
}
