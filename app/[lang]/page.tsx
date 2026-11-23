import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import getProjects from "@/datas/projects";
import { getLocalizedPathname, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPageAlternates } from "@/lib/i18n/metadata";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { lang } = await params;
    return getPageAlternates(lang, "/");
}

export default async function Page({ params }: PageProps) {
    const { lang } = await params;

    if (!hasLocale(lang)) {
        notFound();
    }

    const { home, nav, projects } = getDictionary(lang);
    const projectSummaries: Partial<Record<number, string>> = home.projectSummaries;
    const featuredProjects = getProjects(lang).filter(({ id }) => id === 6 || id === 1 || id === 3);

    return (
        <>
            <section className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-4 py-8 md:items-end md:gap-x-12 md:gap-y-3 md:py-16">
                <h1 className="text-4xl leading-[1.05] font-bold tracking-tight md:text-[3.25rem]">Anthony Rolland</h1>
                <Image
                    src="/me.jpg"
                    alt={home.portraitAlt}
                    width={224}
                    height={248}
                    sizes="(min-width: 768px) 224px, 104px"
                    className="col-start-2 row-start-1 h-28 w-26 rounded-lg object-cover md:row-span-2 md:h-62 md:w-56"
                    preload
                />
                <div className="col-span-2 max-w-[68ch] md:col-span-1 md:row-start-2 md:self-start">
                    <p className="text-base leading-[1.625] text-muted-foreground">{home.headline}</p>
                    <p className="mt-3 text-base leading-[1.625] font-medium">{home.internshipCallout}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button asChild className="h-11 shadow-none">
                            <Link href={getLocalizedPathname(lang, "/contact")}>{nav.contact}</Link>
                        </Button>
                        <Button asChild variant="outline" className="h-11 shadow-none hover:bg-card hover:text-foreground">
                            <a href="/cv.pdf">{nav.resume}</a>
                        </Button>
                    </div>
                </div>
            </section>
            <section aria-labelledby="featured-work" className="border-t border-border pt-8 pb-12 md:pb-16">
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h2 id="featured-work" className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                        {home.featuredTitle}
                    </h2>
                    <Link
                        href={getLocalizedPathname(lang, "/projects")}
                        className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4 hover:no-underline"
                    >
                        {home.allProjects}
                    </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {featuredProjects.map((project) => (
                        <Card key={project.id} className="flex flex-col rounded-lg border-border bg-card p-4 shadow-none md:p-6">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="mt-2 mb-4 text-base leading-[1.625] text-muted-foreground">{projectSummaries[project.id] ?? project.description}</p>
                            <a
                                href={project.githubUrl}
                                aria-label={project.title + " · " + projects.cta}
                                className="mt-auto inline-flex min-h-11 w-fit items-center text-sm font-medium text-accent underline underline-offset-4 hover:no-underline"
                            >
                                {projects.cta}
                            </a>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
}
