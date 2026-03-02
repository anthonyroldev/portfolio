import { IconType } from 'react-icons';
import { DiJava } from "react-icons/di";
import { FaAngular, FaAws, FaDocker, FaGitAlt, FaJs, FaLinux, FaPhp, FaPython, FaReact } from 'react-icons/fa';
import { RiNextjsLine } from "react-icons/ri";
import {
    SiLaravel,
    SiMongodb,
    SiMysql,
    SiNginx,
    SiPostgresql,
    SiSpringboot,
    SiSqlite,
    SiTypescript
} from 'react-icons/si';

interface Skill {
    name: string;
    icon: IconType;
}

interface SkillCategory {
    name: string;
    skills: Skill[];
}

const skills: SkillCategory[] = [
    {
        name: "Front-End",
        skills: [
            {name: "JavaScript", icon: FaJs},
            {name: "TypeScript", icon: SiTypescript},
            {name: "React", icon: FaReact},
            {name: "NextJS", icon: RiNextjsLine},
            {name: "Angular", icon: FaAngular},
        ],
    },
    {
        name: "Back-End",
        skills: [
            {name: "Spring Boot", icon: SiSpringboot},
            {name: "Java", icon: DiJava},
            {name: "PHP", icon: FaPhp},
            {name: "Laravel", icon: SiLaravel},
            {name: "Python", icon: FaPython},
        ],
    },
    {
        name: "Database",
        skills: [
            {name: "MySQL", icon: SiMysql},
            {name: "MongoDB", icon: SiMongodb},
            {name: "PostgreSQL", icon: SiPostgresql},
            {name: "SQLite", icon: SiSqlite},
        ],
    },
    {
        name: "DevOps",
        skills: [
            {name: "Docker", icon: FaDocker},
            {name: "Git", icon: FaGitAlt},
            {name: "CI/CD", icon: FaGitAlt},
            {name: "AWS", icon: FaAws},
        ],
    },
    {
        name: "Autres",
        skills: [
            {name: "Linux", icon: FaLinux},
            {name: "Nginx", icon: SiNginx},
        ],
    },
];

export function getSkills() {
    return skills;
}

