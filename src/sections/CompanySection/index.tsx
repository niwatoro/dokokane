import { FC } from "react";
import { Company } from "@/scripts/types/company";
import { Layout } from "@/sections/components/Layout";
import styles from "@/styles/sections/CompanySection/index.module.css";
import { MoneyGraph } from "@/sections/CompanySection/components/MoneyGraph";
import { Link } from "@nextui-org/link";
import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";
import { Heading } from "@/sections/components/Heading";
import { InfoTable } from "@/sections/CompanySection/components/InfoTable";
import { Industry } from "@/scripts/types/industry";

type Props = {
  company: Company;
  segments: Industry[] | null;
};
export const CompanySection: FC<Props> = ({ company, segments }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Breadcrumbs>
          <BreadcrumbItem>会社</BreadcrumbItem>
          <BreadcrumbItem>{company.name}</BreadcrumbItem>
        </Breadcrumbs>
        <Spacer y={4} />
        <div>
          <div className={styles.name}>{company.name}</div>
          <div>
            出典：
            <Link href={company.sourceUrl} target={"_blank"}>
              {company.sourceTitle}
            </Link>
          </div>
        </div>
        <Spacer y={8} />
        <MoneyGraph company={company} />
        <Spacer y={8} />
        <Heading>基本情報</Heading>
        <InfoTable company={company} segments={segments} />
        <Spacer y={8} />
        <Heading>事業の内容</Heading>
        <div className={styles["description-container"]}>
          {company.description
            .split("。 ")
            .filter((s) => s.length > 0)
            .map((sentence, i) => (
              <div key={i} className={styles.sentence}>
                {sentence}
                {sentence[sentence.length - 1] !== "。" && "。"}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};
