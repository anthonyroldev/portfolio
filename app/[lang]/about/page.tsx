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

    const { about, home } = getDictionary(lang);

    return (
        <div className="max-w-[68ch] py-8 md:py-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:mb-6">{about.title}</h1>
            <div className="flex flex-col gap-4 text-muted-foreground">
                <p>{about.introduction}</p>
                <p>{home.agenticDevelopment}</p>
            </div>
            <section aria-labelledby="experience" className="mt-8 md:mt-12">
                <h2 id="experience" className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                    {about.experienceTitle}
                </h2>
                <ol role="list" className="mt-4 flex flex-col gap-4 border-l border-border pl-4">
                    {about.experience.map(({ title, organization, period, detail }) => (
                        <li key={organization} className="grid gap-1 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-4">
                            <p className="font-mono text-label text-muted-foreground">{period}</p>
                            <div>
                                <h3 className="font-semibold">{title}</h3>
                                <p className="text-sm text-muted-foreground">{organization}</p>
                                {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
                            </div>
                        </li>
                    ))}
                </ol>
            </section>
            <SkillsGrid locale={lang} title={about.skillsTitle} />
        </div>
    );
}
