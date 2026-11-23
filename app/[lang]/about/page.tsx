import { notFound } from "next/navigation";

import SkillsGrid from "@/components/About/SkillsGrid";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPageAlternates } from "@/lib/i18n/metadata";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { lang } = await params;
    if (!hasLocale(lang)) {
        notFound();
    }

    const { about } = getDictionary(lang);
    return {
        ...getPageAlternates(lang, "/about"),
        title: about.title,
        description: about.description,
    };
}

export default async function Page({ params }: PageProps) {
    const { lang } = await params;

    if (!hasLocale(lang)) {
        notFound();
    }

    const { about } = getDictionary(lang);

    return (
        <div className="max-w-[68ch] py-8 md:py-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:mb-6">{about.title}</h1>
            <div className="space-y-4 text-muted-foreground">
                <p>{about.introduction}</p>
                <p>{about.summary}</p>
            </div>
            <SkillsGrid locale={lang} title={about.skillsTitle} />
        </div>
    );
}
