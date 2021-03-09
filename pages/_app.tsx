import "../styles/globals.css";
import Layout from "@components/Layout";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CookiesProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CookiesProvider>
    );
}

export default MyApp;
