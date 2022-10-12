import { LanguageCodeEnum } from "~src/components/regions/RegionsProvider";
import * as Locales from "date-fns/locale";
import { Locale } from "date-fns";

export const DEFAULT_LOCALE = "en-US";

export const LOCALES = [
  {
    slug: "en-US",
    code: "EN_US" as LanguageCodeEnum,
    name: "English",
  },
  {
    slug: "es-ES",
    code: "ES_ES" as LanguageCodeEnum,
    name: "Spanish",
  },
];

export const localeToEnum = (localeSlug: string): LanguageCodeEnum => {
  const chosenLocale = LOCALES.find(({ slug }) => slug === localeSlug)?.code;
  if (chosenLocale) {
    return chosenLocale;
  }

  return LOCALES.find(({ slug }) => slug === DEFAULT_LOCALE)?.code || "EN_US";
};

/**
 * Thanks! https://stackoverflow.com/a/68876570/10395099
 * @param locale
 * @returns
 */
export function getDateFnsLocale(locale: string): Locale {
  const largeLocale = locale.replace("-", "");
  const shortLocale = locale.substring(0, 2);
  // @ts-ignore
  return Locales[largeLocale] ?? Locales[shortLocale] ?? Locales.enUS;
}
