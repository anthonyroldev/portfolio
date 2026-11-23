import type Project from "@/datas/interfaces/projects";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

interface ProjectRecord extends Omit<Project, "description"> {
    descriptionKey: keyof Dictionary["projects"]["descriptions"];
}

const projects: ProjectRecord[] = [
    {
        id: 6,
        title: "RAG API",
        descriptionKey: "rag",
        status: "inProgress",
        image: "/projects/6/rag-api.svg",
        tags: ["Java", "Spring Boot", "PostgreSQL", "pgvector", "Ollama"],
        githubUrl: "https://github.com/anthonyroldev/rag-spring",
    },
    {
        id: 1,
        title: "API PicIt",
        descriptionKey: "picitApi",
        image: "/projects/1/picit.png",
        tags: ["Java", "Spring Boot", "MongoDB", "Neo4j", "Docker"],
        githubUrl: "https://github.com/anthonyroldev/picit-api",
    },
    {
        id: 2,
        title: "PicIt Front",
        descriptionKey: "picitFront",
        image: "/projects/2/picit_front.png",
        tags: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubUrl: "https://github.com/anthonyroldev/picit-front",
    },
    {
        id: 3,
        title: "FCrypt",
        descriptionKey: "fcrypt",
        image: "/projects/3/art_project_2.png",
        tags: ["Spring Shell", "Java", "Encryption", "Docker"],
        githubUrl: "https://github.com/anthonyroldev/Fcrpyt",
    },
    {
        id: 4,
        title: "ClearLinks",
        descriptionKey: "clearLinks",
        image: "/projects/4/clear_links.png",
        tags: ["TypeScript", "Solidity", "Ethereum", "Hardhat"],
        githubUrl: "https://github.com/anthonyroldev/ClearLinks-Contracts",
    },
    {
        id: 5,
        title: "Rythmopolis",
        descriptionKey: "rythmopolis",
        image: "/projects/5/rythmopolis.png",
        tags: ["TypeScript", "Angular", "Tailwind CSS"],
        githubUrl: "https://github.com/anthonyroldev/Site-Rythmopolis",
    },
];

export default function getProjects(locale: Locale): Project[] {
    const { descriptions, encryptionTag } = getDictionary(locale).projects;
    return projects.map(({ descriptionKey, ...project }) => ({
        ...project,
        description: descriptions[descriptionKey],
        tags: project.tags.map((tag) => tag === "Encryption" ? encryptionTag : tag),
    }));
}
