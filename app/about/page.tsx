'use client'

import { getSkills } from "@/datas/skills";
import { motion } from "framer-motion";

export default function Page() {
    const skills = getSkills();

    return (
        <section className="py-10 md:py-16">
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            >
                Mes compétences
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {skills.map((category, index) => (
                    <motion.div
                        key={category.name}
                        className="p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                        <h3 className="text-xl md:text-2xl font-semibold mb-4">{category.name}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="flex flex-col items-center">
                                    <skill.icon className="text-3xl md:text-4xl mb-2 text-accent" />
                                    <span className="text-xs md:text-sm text-center">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

