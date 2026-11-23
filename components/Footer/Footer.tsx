import LocaleSwitcher from "@/components/Footer/LocaleSwitcher";
import { getLinks } from "@/datas/links";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
    locale: Locale;
    labels: Dictionary["footer"];
    cvLabel: string;
}

export default function Footer({ locale, labels, cvLabel }: FooterProps) {
    const links = [{ name: cvLabel, url: "/cv.pdf" }, ...getLinks().filter(({ url }) => url.startsWith("https://"))];

    return (
        <footer className="border-t border-border">
            <div className="site-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-sm">
                <nav aria-label={labels.links} className="flex flex-wrap items-center gap-x-4">
                    {links.map(({ name, url }) => (
                        <a key={url} href={url} className="inline-flex min-h-9 items-center underline underline-offset-4 hover:text-accent">
                            {name}
                        </a>
                    ))}
                </nav>
                <LocaleSwitcher currentLocale={locale} label={labels.language} />
            </div>
        </footer>
    );
}
