import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import getProjects from "@/datas/projects";
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
    const projects = getProjects(lang);

    return (
        <section className="py-10 md:py-16">
            <h1 className="mb-8 bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {dictionary.projects.title}
            </h1>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        </Link>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg md:text-xl">{project.title}</CardTitle>
                            <CardDescription className="line-clamp-2 text-sm">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <Button size="sm" variant="outline" asChild className="w-full sm:w-auto">
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <Image
                                        src="/icons/github-mark.png"
                                        alt="GitHub"
                                        width={16}
                                        height={16}
                                        className="dark:invert"
                                    />
                                    {dictionary.projects.cta}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
