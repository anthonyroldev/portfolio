'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Project from "@/datas/interfaces/projects";
import getProjects from "@/datas/projects";
import { useTheme } from 'next-themes';
import Image from "next/image";
import Link from "next/link";

const projects: Project[] = getProjects()

export default function Page() {
    const {theme} = useTheme();

    return (
        <div>
            <main className="container mx-auto px-6 pt-10 pb-12">
                <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Mes
                    Projets</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-16">
                    {projects.map((project) => (
                        <Card key={project.id}
                              className="overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
                            <Link href={project.githubUrl} target="_blank">
                                <Image src={project.image}
                                       alt={project.title}
                                       className="w-full h-36 md:h-48 object-cover"
                                       width={500}
                                       height={500}/>
                            </Link>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                                <div className="flex space-x-2">
                                    <Button size="default" variant="outline" asChild>
                                        <Link key={project.id} href={project.githubUrl} target="_blank"
                                              rel="noopener noreferrer">
                                            <Image
                                                src={theme === 'dark' || theme === undefined ? '/icons/github-mark-white.png' : '/icons/github-mark.png'}
                                                alt="github"
                                                width={15}
                                                height={15}/>
                                            <p className="ml-2">Github</p>
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}