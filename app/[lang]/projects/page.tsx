import Image from "next/image";
import { notFound } from "next/navigation";

import ProjectTags from "@/components/Projects/ProjectTags";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import getProjects from "@/datas/projects";
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

    const { projects } = getDictionary(lang);
    return {
        ...getPageAlternates(lang, "/projects"),
        title: projects.title,
        description: projects.description,
    };
}

export default async function Page({ params }: PageProps) {
    const { lang } = await params;

    if (!hasLocale(lang)) {
        notFound();
    }

    const { projects } = getDictionary(lang);

    return (
        <section className="py-8 md:py-12">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:mb-8">{projects.title}</h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {getProjects(lang).map((project, index) => (
                    <Card key={project.id} className="flex flex-col overflow-hidden rounded-lg border-border bg-card shadow-none">
                        <div className="relative aspect-video border-b border-border">
                            <Image
                                src={project.image}
                                alt=""
                                fill
                                preload={index === 0}
                                decoding={index === 0 ? "sync" : "async"}
                                sizes="(min-width: 1100px) 330px, (min-width: 960px) 32vw, (min-width: 640px) 48vw, 92vw"
                                className="object-contain"
                            />
                        </div>
                        <CardHeader className="p-4 pb-2 md:px-6 md:pt-6">
                            <div className="flex flex-col gap-1">
                                <CardTitle><h2 className="text-xl tracking-normal">{project.title}</h2></CardTitle>
                                {project.status && (
                                    <p className="font-mono text-label text-accent">{projects.statuses[project.status]}</p>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 px-4 pb-4 md:px-6">
                            <CardDescription><p className="text-base leading-[1.625]">{project.description}</p></CardDescription>
                            <ProjectTags tags={project.tags} />
                        </CardContent>
                        <CardFooter className="px-4 pb-4 md:px-6 md:pb-6">
                            <a
                                href={project.githubUrl}
                                aria-label={projects.sourceLabel.replace("{project}", project.title)}
                                className="inline-flex min-h-11 w-fit items-center text-sm font-medium text-accent underline underline-offset-4 hover:no-underline"
                            >
                                {projects.cta}
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
