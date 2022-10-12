import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { DEFAULT_LOCALE } from "~src/lib/regions";

interface ILocalizedRouterProps {}

export default function LocalizedRouter(
  props: React.PropsWithChildren<ILocalizedRouterProps>
) {
  const { children } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:pathLocale/*" element={children} />
        <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} />} />
      </Routes>
    </BrowserRouter>
  );
}
