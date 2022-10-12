import { useLocation } from "react-router-dom";
import { useRegions } from "~src/components/regions/RegionsProvider";
import { pagesPath } from "./$path";

export function useURLQueryParam() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  return query;
}

export function switchLocale(
  pathname: string,
  search: string,
  currentLocale: string,
  locale: string
): string {
  var regex = new RegExp(currentLocale, "g");
  return `${pathname}${search}`.replace(regex, locale);
}

export default function usePaths() {
  const { currentLocale: locale } = useRegions();
  return pagesPath._locale(locale);
}
