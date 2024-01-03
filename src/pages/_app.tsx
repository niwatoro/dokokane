import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "@/components/Header";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({ subsets: [] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div className={notoSansJP.className}>
        <Header />
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}
