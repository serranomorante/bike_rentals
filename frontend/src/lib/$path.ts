type OptionalQuery = {};

function convertToString<TValue extends {}>(obj: TValue) {
  const params = new URLSearchParams(obj).toString();
  return params;
}

export const pagesPath = {
  _locale: (locale: string | number) => ({
    rides: {
      _slug: (slug: string | number) => ({
        _resourceType: (resourcetype: string) => ({
          $url: (url?: { query?: OptionalQuery }) => ({
            pathname: `/${locale}/rides/${slug}` as const,
            search: convertToString({ locale, resourcetype, ...url?.query }),
          }),
        }),
      }),
    },
    checkout: {
      _rideSlug: (rideslug: string | number) => ({
        _rideResourceType: (resourcetype: string) => ({
          $url: (url?: { query?: OptionalQuery }) => ({
            pathname: `/${locale}/checkout` as const,
            search: convertToString({
              locale,
              resourcetype,
              rideslug,
              ...url?.query,
            }),
          }),
        }),
      }),
    },
    $url: () => ({ pathname: `/${locale}` as const }),
  }),
};

export type PagesPath = typeof pagesPath;
