import { FC } from "react";
import { Company } from "@/scripts/types/company";
import { Layout } from "@/sections/components/Layout";
import styles from "@/styles/sections/CompanySection/index.module.css";
import { MoneyGraph } from "@/sections/CompanySection/components/MoneyGraph";
import { Link } from "@nextui-org/link";
import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";
import { Heading } from "@/sections/components/Heading";
import { InfoTable } from "@/sections/CompanySection/components/InfoTable";

type Props = {
  company: Company;
};
export const CompanySection: FC<Props> = ({ company }) => {
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
        <Heading>基本情報</Heading>
        <InfoTable company={company} />
        <Spacer y={8} />
        <MoneyGraph company={company} />
      </div>
    </Layout>
  );
};
