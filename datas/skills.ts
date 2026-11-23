import type { Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

export interface SkillCategory {
    name: string;
    skills: string[];
}

const skills: { key: keyof Dictionary["about"]["categories"]; skills: string[] }[] = [
    { key: "backEnd", skills: ["Java", "Spring Boot", "PHP", "Laravel", "Python"] },
    { key: "databases", skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
    { key: "devOps", skills: ["Docker", "Git", "CI/CD", "AWS", "Linux", "Nginx"] },
    { key: "frontEnd", skills: ["JavaScript", "TypeScript", "React", "Next.js", "Angular"] },
];

export function getSkills(locale: Locale): SkillCategory[] {
    const { categories } = getDictionary(locale).about;
    return skills.map(({ key, skills }) => ({ name: categories[key], skills }));
}
