import * as React from "react";
import { Link as RouterLink, Navigate, useLocation } from "react-router-dom";
import Box, { BoxProps } from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useIntl } from "react-intl";
import messages from "../translations";
import usePaths, { switchLocale } from "~src/lib/paths";
import { useRegions } from "../regions/RegionsProvider";

export default function Layout(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const t = useIntl();
  const paths = usePaths();
  const { pathname, search } = useLocation();
  const { currentLocale } = useRegions();
  const [locale, setLocale] = React.useState<string>(currentLocale);

  function handleLocaleChange(event: SelectChangeEvent) {
    setLocale(event.target.value as string);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {currentLocale !== locale && (
        <Navigate to={switchLocale(pathname, search, currentLocale, locale)} />
      )}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* @ts-ignore */}
          <Logo variant="h6" component={RouterLink} to={paths.$url()}>
            {t.formatMessage(messages.pageTitle)}
          </Logo>
          <FormControl variant="standard" sx={{ marginLeft: "auto" }}>
            <CSelect
              value={locale}
              label="Locale"
              onChange={(e) =>
                handleLocaleChange(e as SelectChangeEvent<string>)
              }
            >
              <MenuItem value="en-US">English</MenuItem>
              <MenuItem value="es-ES">Spanish</MenuItem>
            </CSelect>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Wrapper>{children}</Wrapper>
    </Box>
  );
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  marginTop: "20px",
}));

const Logo = styled(Typography)<TypographyProps>(() => ({
  color: "white",
  textDecoration: "none",
}));

const CSelect = styled(Select)<SelectProps>(() => ({
  color: "white",
}));
