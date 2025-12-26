'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Project from "@/datas/interfaces/projects";
import getProjects from "@/datas/projects";
import Image from "next/image";
import Link from "next/link";

const projects: Project[] = getProjects()

export default function Page() {
    return (
        <section className="py-10 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Mes Projets
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {projects.map((project) => (
                    <Card 
                        key={project.id}
                        className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                    >
                        <Link href={project.githubUrl} target="_blank">
                            <div className="aspect-video relative overflow-hidden">
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
                            <CardDescription className="text-sm line-clamp-2">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
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
                                    GitHub
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}