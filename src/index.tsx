import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
    ${reset}
    button{
        border: none;
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
