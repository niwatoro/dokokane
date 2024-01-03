import { Description } from "@/sections/IndexSection/components/Description";
import { Layout } from "@/sections/components/Layout";
import { PreviewCard } from "@/sections/IndexSection/components/PreviewCard";
import { Heading } from "@/sections/components/Heading";
import styles from "@/styles/sections/IndexSection/index.module.css";

const companies = [
  {
    securitiesCode: "9613",
    name: "株式会社ＮＴＴデータグループ",
    netSales: 2167083000000,
    averageAnnualSalary: 8670000,
    averageAge: 39,
    numberOfEmployees: 195106,
  },
  {
    securitiesCode: "6758",
    name: "ソニーグループ株式会社",
    netSales: 168964000000,
    averageAnnualSalary: 11018955,
    averageAge: 42.4,
    numberOfEmployees: 2445,
  },
];

export const IndexSection = () => {
  return (
    <Layout>
      <div>
        <Description />
        <Heading>企業一覧</Heading>
        <div className={styles["preview-card-container"]}>
          {companies.map((company, i) => (
            <PreviewCard key={i} company={company} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
