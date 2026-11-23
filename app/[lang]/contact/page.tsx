import { notFound } from "next/navigation";

import ContactForm from "@/components/Contact/ContactForm";
import { getLinks } from "@/datas/links";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPageAlternates } from "@/lib/i18n/metadata";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { lang } = await params;
    if (!hasLocale(lang)) {
        notFound();
    }

    const { contact } = getDictionary(lang);
    return {
        ...getPageAlternates(lang, "/contact"),
        title: contact.title,
        description: contact.description,
    };
}

export default async function Page({ params }: PageProps) {
    const { lang } = await params;

    if (!hasLocale(lang)) {
        notFound();
    }

    const { contact } = getDictionary(lang);

    return (
        <div className="max-w-[68ch] py-8 md:py-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:mb-6">{contact.title}</h1>
            <ul className="flex flex-wrap gap-x-6 gap-y-1" role="list">
                {getLinks().map(({ name, url }) => (
                    <li key={url} className="first:max-sm:w-full">
                        <a
                            href={url}
                            className="inline-flex min-h-11 items-center font-medium text-accent underline underline-offset-4 hover:no-underline"
                        >
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
            <section aria-labelledby="contact-form" className="mt-6 border-t border-border pt-8">
                <h2 id="contact-form" className="mb-3 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                    {contact.formTitle}
                </h2>
                <ContactForm dictionary={contact} />
            </section>
        </div>
    );
}
