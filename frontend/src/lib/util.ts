import { DEFAULT_LOCALE } from "./regions";

export const formatAsMoney = (
  amount: string | number,
  currency = "USD",
  locale = DEFAULT_LOCALE
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(amount));
