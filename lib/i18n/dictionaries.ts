import en from "@/locales/en/common.json";
import fr from "@/locales/fr/common.json";
import type { Locale } from "@/lib/i18n/config";

const dictionaries = {
    en,
    fr,
} satisfies Record<Locale, typeof en>;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale) {
    return dictionaries[locale];
}
