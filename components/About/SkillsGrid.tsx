"use client";

import { motion } from "framer-motion";

import { getSkills } from "@/datas/skills";
import type { Locale } from "@/lib/i18n/config";

interface SkillsGridProps {
    locale: Locale;
    title: string;
}

export default function SkillsGrid({ locale, title }: SkillsGridProps) {
    const skills = getSkills(locale);

    return (
        <section className="py-10 md:py-16">
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            >
                {title}
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((category, index) => (
                    <motion.div
                        key={category.name}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                        <h3 className="mb-4 text-xl font-semibold md:text-2xl">{category.name}</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="flex flex-col items-center">
                                    <skill.icon className="mb-2 text-3xl text-accent md:text-4xl" />
                                    <span className="text-center text-xs md:text-sm">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
