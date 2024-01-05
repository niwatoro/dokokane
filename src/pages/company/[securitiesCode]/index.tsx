import Head from "next/head";
import { CompanySection } from "@/sections/CompanySection";

const company = {
  securitiesCode: "9613",
  name: "株式会社ＮＴＴデータグループ",
  netSales: 2167083000000,
  operatingIncome: 98469000000,
  averageAnnualSalary: 8670000,
  averageAge: 39,
  numberOfEmployees: 195106,
  sourceTitle: "有価証券報告書－第35期(2022/04/01－2023/03/31)",
  sourceUrl:
    "https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/S100QYZA.pdf",
};

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
        <CompanySection company={company} />
      </main>
    </>
  );
}
