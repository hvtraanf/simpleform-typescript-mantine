import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Verdana, sans-serif",
        primaryColor: "blue",
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
