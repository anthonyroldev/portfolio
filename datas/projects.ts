import Project from "@/datas/interfaces/projects";

const projects: Project[] = [
    {
        id: 1,
        title: "API PicIt",
        description: "API RESTful pour le réseau social PicIt",
        image: "/projects/1/picit.png",
        tags: ["Java", "Spring Boot", "MongoDB", "Neo4j", "Docker"],
        githubUrl: "https://github.com/anthonyroldev/picit-api",
    },
    {
        id: 2,
        title: "PicIt Front",
        description: "Frontend du réseau social PicIt développé avec NextJS",
        image: "/projects/2/picit_front.png",
        tags: ["TypeScript", "NextJS", "TailwindCSS"],
        githubUrl: "https://github.com/anthonyroldev/picit-front"
    },
    {
        id: 3,
        title: "FCrypt",
        description: "Outil de chiffrement de fichiers (texte, image, audio, vidéo)",
        image: "/projects/3/art_project_2.png",
        tags: ["Spring Shell", "Java", "Chiffrement", "Docker"],
        githubUrl: "https://github.com/anthonyroldev/Fcrpyt",
    },
    {
        id: 4,
        title: "ClearLinks",
        description: "Contrats sur la blockchain Ethereum (Sepolia Testnet) permettant de faire des donations à des créateurs, des votes, etc .",
        image: "/projects/4/clear_links.png",
        tags: ["TypeScript", "Solidity", "Ethereum", "Hardat"],
        githubUrl: "https://github.com/anthonyroldev/ClearLinks-Contracts"
    },
    {
        id: 5,
        title: "Rythmopolis",
        description: "Site web d'un projet d'évenementiel musical",
        image: "/projects/5/rythmopolis.png",
        tags: ["TypeScript", "Angular", "TailwindCSS"],
        githubUrl: "https://github.com/anthonyroldev/Site-Rythmopolis"
    }
]

export default function getProjects(): Project[] {
    return projects;
}

