import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RegionsProvider from "./components/regions/RegionsProvider";
import Home from "./components/Home";
import LocalizedRouter from "./components/regions/LocalizedRouter";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "react-query";
import { Route, Routes } from "react-router-dom";
import RideDetail from "./components/ride/RideDetail";
import Checkout from "./components/checkout/Checkout";

import "react-nice-dates/build/style.css";
import Layout from "./components/navigation/Layout";

const theme = createTheme({
  status: {
    danger: "white", // orange[500],
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "cardTitle" },
          style: {
            fontSize: "1em",
            fontWeight: "bold",
          },
        },
        {
          props: { variant: "sectionTitle" },
          style: {
            fontSize: "1em",
            fontWeight: "bold",
            marginBottom: "12px",
          },
        },
      ],
    },
  },
});

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
};

export default function App() {
  const [queryClient] = React.useState(
    () => new QueryClient(queryClientConfig)
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <LocalizedRouter>
            <RegionsProvider>
              <Layout>
                <Routes>
                  <Route path="*" element={<Home />} />
                  <Route path="rides/:id" element={<RideDetail />} />
                  <Route path="checkout/" element={<Checkout />} />
                </Routes>
              </Layout>
            </RegionsProvider>
          </LocalizedRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
