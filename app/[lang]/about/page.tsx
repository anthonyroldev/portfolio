import { notFound } from "next/navigation";

import SkillsGrid from "@/components/About/SkillsGrid";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
    const { lang } = await params;

    if (!hasLocale(lang)) {
        notFound();
    }

    const dictionary = getDictionary(lang);

    return <SkillsGrid locale={lang} title={dictionary.about.title} />;
}
