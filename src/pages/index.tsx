import Head from "next/head";
import { IndexSection } from "@/sections/IndexSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>ドコカネ</title>
        <meta
          name="description"
          content="ドコカネ - お金はどこからどこへ行く？"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <IndexSection />
      </main>
    </>
  );
}
