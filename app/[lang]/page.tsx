import Image from "next/image";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/config";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
    const { lang } = await params;

    if (!hasLocale(lang)) {
        notFound();
    }

    const dictionary = getDictionary(lang);

    return (
        <section className="py-10 md:py-16">
            <div className="text-center md:text-left">
                <p className="text-3xl font-bold sm:text-4xl md:text-5xl">ROLLAND Anthony</p>
                <h1 className="mt-4 bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl">
                    {dictionary.home.headline}
                    <br />
                    {dictionary.home.apprenticeshipPrefix}{" "}
                    <a
                        href="https://www.sncf-connect-tech.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        SNCF Connect & Tech
                    </a>
                </h1>
            </div>
            <div className="mt-12 flex flex-col items-center justify-center gap-8 md:flex-row">
                <Image
                    src="/me.jpg"
                    alt="Anthony ROLLAND"
                    width={300}
                    height={300}
                    className="h-56 w-48 rounded-3xl object-cover shadow-lg md:h-80 md:w-72"
                    priority
                />
                <p className="max-w-2xl text-left text-lg leading-relaxed md:text-xl">
                    {dictionary.home.introduction}
                    <br />
                    <br />
                    {dictionary.home.summary}
                </p>
            </div>
        </section>
    );
}
