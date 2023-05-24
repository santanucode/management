import React from "react"
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import Router from "../router/Router";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import colorJSON from "../assets/colors/colorset-alpha.json";
import "./Root.css";
import { Route, Routes } from 'react-router-dom';
import MainLayout from "components/common/layout/mainLayout";
import { Login } from "pages";
import { UserSigninComponent } from "pages/auth/signin/container/signinContainer";

const theme = createTheme({
  palette: {
    primary: {
      light: colorJSON["primary-light"],
      main: colorJSON.primary,
      dark: colorJSON["primary-dark"],
      contrastText: colorJSON.white,
    },
    secondary: {
      light: colorJSON["secondary-light"],
      main: colorJSON.secondary,
      dark: colorJSON["secondary-dark"],
      contrastText: colorJSON.white,
    },
    error: {
      light: colorJSON["error-light"],
      main: colorJSON.error,
      dark: colorJSON["error-dark"],
      contrastText: colorJSON.black,
    },
    warning: {
      light: colorJSON["warning-light"],
      main: colorJSON.warning,
      dark: colorJSON["warning-dark"],
      contrastText: colorJSON.black,
    },
  },
  typography: {
    fontFamily: ["Lexend Deca", "sans-serif"].join(","),
  },
});
export interface USERDT {
  login_id?: string,
  token?: string
}

function App() {

  const user = JSON.parse(localStorage.getItem('user') as string);

  return user !== null ? (

    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Router />
          </MainLayout>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  ) : (
    <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSigninComponent />} />
      </Routes>
    </BrowserRouter>
    </Provider>

  )
}


export default App;
