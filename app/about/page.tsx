'use client'

import { getSkills } from "@/datas/skills";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Page() {
    const skills = getSkills();
    const isLightTheme = useTheme().theme === 'light';

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-6 py-10">
                <motion.h2
                    className="text-3xl font-semibold mb-8 text-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3, duration: 0.3}}
                >
                    Mes compétences
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {skills.map((category, index) => (
                        <motion.div
                            key={category.name}
                            className={`p-6 rounded-lg shadow-lg ${isLightTheme ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1 * index, duration: 0.3}}
                        >
                            <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {category.skills.map((skill) => (
                                    <div key={skill.name} className="flex flex-col items-center">
                                        <skill.icon className="text-4xl mb-2 text-blue-400"/>
                                        <span className="text-sm">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

