import type { Locale } from "@/lib/i18n/config";
import { DiJava } from "react-icons/di";
import { FaAngular, FaAws, FaDocker, FaGitAlt, FaJs, FaLinux, FaPhp, FaPython, FaReact } from "react-icons/fa";
import type { IconType } from "react-icons";
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
} from "react-icons/si";

interface Skill {
    name: string;
    icon: IconType;
}

export interface SkillCategory {
    name: string;
    skills: Skill[];
}

interface SkillCategoryRecord {
    name: Record<Locale, string>;
    skills: Skill[];
}

const skills: SkillCategoryRecord[] = [
    {
        name: {
            en: "Front-End",
            fr: "Front-End",
        },
        skills: [
            {name: "JavaScript", icon: FaJs},
            {name: "TypeScript", icon: SiTypescript},
            {name: "React", icon: FaReact},
            {name: "Next.js", icon: RiNextjsLine},
            {name: "Angular", icon: FaAngular},
        ],
    },
    {
        name: {
            en: "Back-End",
            fr: "Back-End",
        },
        skills: [
            {name: "Spring Boot", icon: SiSpringboot},
            {name: "Java", icon: DiJava},
            {name: "PHP", icon: FaPhp},
            {name: "Laravel", icon: SiLaravel},
            {name: "Python", icon: FaPython},
        ],
    },
    {
        name: {
            en: "Databases",
            fr: "Bases de donnees",
        },
        skills: [
            {name: "MySQL", icon: SiMysql},
            {name: "MongoDB", icon: SiMongodb},
            {name: "PostgreSQL", icon: SiPostgresql},
            {name: "SQLite", icon: SiSqlite},
        ],
    },
    {
        name: {
            en: "DevOps",
            fr: "DevOps",
        },
        skills: [
            {name: "Docker", icon: FaDocker},
            {name: "Git", icon: FaGitAlt},
            {name: "CI/CD", icon: FaGitAlt},
            {name: "AWS", icon: FaAws},
        ],
    },
    {
        name: {
            en: "Other",
            fr: "Autres",
        },
        skills: [
            {name: "Linux", icon: FaLinux},
            {name: "Nginx", icon: SiNginx},
        ],
    },
];

export function getSkills(locale: Locale): SkillCategory[] {
    return skills.map((category) => ({
        name: category.name[locale],
        skills: category.skills,
    }));
}

