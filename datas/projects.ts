import Project from "@/datas/interfaces/projects";
import type { Locale } from "@/lib/i18n/config";

interface ProjectRecord extends Omit<Project, "description"> {
    description: Record<Locale, string>;
}

const projects: ProjectRecord[] = [
    {
        id: 1,
        title: "API PicIt",
        description: {
            en: "REST API for the PicIt social network",
            fr: "API RESTful pour le reseau social PicIt",
        },
        image: "/projects/1/picit.png",
        tags: ["Java", "Spring Boot", "MongoDB", "Neo4j", "Docker"],
        githubUrl: "https://github.com/anthonyroldev/picit-api",
    },
    {
        id: 2,
        title: "PicIt Front",
        description: {
            en: "Frontend for the PicIt social network built with Next.js",
            fr: "Frontend du reseau social PicIt developpe avec Next.js",
        },
        image: "/projects/2/picit_front.png",
        tags: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubUrl: "https://github.com/anthonyroldev/picit-front",
    },
    {
        id: 3,
        title: "FCrypt",
        description: {
            en: "File encryption tool for text, image, audio, and video",
            fr: "Outil de chiffrement de fichiers texte, image, audio et video",
        },
        image: "/projects/3/art_project_2.png",
        tags: ["Spring Shell", "Java", "Encryption", "Docker"],
        githubUrl: "https://github.com/anthonyroldev/Fcrpyt",
    },
    {
        id: 4,
        title: "ClearLinks",
        description: {
            en: "Ethereum smart contracts on Sepolia for donations, voting, and creator support",
            fr: "Contrats Ethereum sur Sepolia pour donations, votes et soutien aux createurs",
        },
        image: "/projects/4/clear_links.png",
        tags: ["TypeScript", "Solidity", "Ethereum", "Hardhat"],
        githubUrl: "https://github.com/anthonyroldev/ClearLinks-Contracts",
    },
    {
        id: 5,
        title: "Rythmopolis",
        description: {
            en: "Website for a music events project",
            fr: "Site web d un projet d evenementiel musical",
        },
        image: "/projects/5/rythmopolis.png",
        tags: ["TypeScript", "Angular", "Tailwind CSS"],
        githubUrl: "https://github.com/anthonyroldev/Site-Rythmopolis",
    },
];

export default function getProjects(locale: Locale): Project[] {
    return projects.map(({ description, ...project }) => ({
        ...project,
        description: description[locale],
    }));
}

