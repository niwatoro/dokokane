import Head from "next/head";
import { IndexSection } from "@/sections/IndexSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>ドコカネ</title>
        <meta
          name="description"
          content={`
            ドコカネ
            
            会社では何円稼ぎましたか？
            そのうち何円貰いましたか？
            そこから何円使えますか？
          `}
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
