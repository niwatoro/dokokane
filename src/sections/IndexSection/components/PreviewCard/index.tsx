import { Company } from "@/scripts/types/company";
import { FC } from "react";
import styles from "@/styles/sections/IndexSection/components/PreviewCard/index.module.css";
import { formatWithKanji } from "@/scripts/utils/format/format-with-kanji";
import NextLink from "next/link";

type Props = {
  company: Company;
};
export const PreviewCard: FC<Props> = ({ company }) => {
  return (
    <NextLink href={`/company/${company.securitiesCode}`}>
      <div className={styles.container}>
        <div className={styles.name}>{company.name}</div>
        <div>
          <div className={styles["info-grid"]}>
            <div>平均年間給与</div>
            <div>{formatWithKanji(company.averageAnnualSalary)}円</div>
            <div>平均年齢</div>
            <div>{company.averageAge}歳</div>
          </div>
        </div>
      </div>
    </NextLink>
  );
};
