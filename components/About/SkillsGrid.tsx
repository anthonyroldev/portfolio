import { getSkills } from "@/datas/skills";
import type { Locale } from "@/lib/i18n/config";

interface SkillsGridProps {
    locale: Locale;
    title: string;
}

export default function SkillsGrid({ locale, title }: SkillsGridProps) {
    return (
        <section aria-labelledby="technical-skills" className="mt-8 md:mt-12">
            <h2 id="technical-skills" className="mb-4 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                {title}
            </h2>
            <dl className="divide-y divide-border border-y border-border">
                {getSkills(locale).map((category) => (
                    <div key={category.name} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                        <dt className="font-semibold">{category.name}</dt>
                        <dd>
                            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground" role="list">
                                {category.skills.map((skill) => <li key={skill}>{skill}</li>)}
                            </ul>
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
