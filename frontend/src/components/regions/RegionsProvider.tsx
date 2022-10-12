import * as React from "react";
import createSafeContext from "~src/lib/useSafeContext";
import { useParams } from "react-router-dom";
import { DEFAULT_LOCALE, localeToEnum } from "~src/lib/regions";
import { IntlProvider } from "react-intl";
import * as enUS from "~locale/en-US.json";
import * as esES from "~locale/es-ES.json";

export type LanguageCodeEnum = "EN_US" | "ES_ES";

export interface RegionsConsumerProps {
  currentLocale: string;
  query: {
    locale: LanguageCodeEnum;
  };
}

export const [useContext, Provider] = createSafeContext<RegionsConsumerProps>();

export type LocaleMessages = typeof enUS;
export type LocalKey = keyof LocaleMessages;

export function importMessages(locale: string): LocaleMessages {
  switch (locale) {
    case "en-US":
      return enUS;
    case "es-ES":
      return esES;
    default:
      return enUS;
  }
}

export default function RegionsProvider(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const { pathLocale } = useParams();
  const locale = pathLocale || DEFAULT_LOCALE;

  const providerValues: RegionsConsumerProps = {
    currentLocale: locale,
    query: {
      locale: localeToEnum(locale),
    },
  };

  const msgs = importMessages(locale);

  return (
    <Provider value={providerValues}>
      <IntlProvider
        messages={msgs}
        locale={locale}
        defaultLocale={DEFAULT_LOCALE}
      >
        {children}
      </IntlProvider>
    </Provider>
  );
}

export const useRegions = useContext;
