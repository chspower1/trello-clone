import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";
import { RecoilRoot } from "recoil";
import "./fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
    ${reset}
    button{
        border: none;
    }
    *{
        font-family: "Sebang";
        color:#2d3436;
    }
    body{
        font-size:16px;
        font-family: "Sebang";
        box-sizing: border-box;
        color:#2d3436;
    }
    h1{
        font-family:"SebangBold";
    }
`;
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    // <React.StrictMode>
    <RecoilRoot>
        <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </RecoilRoot>
    // </React.StrictMode>
);
