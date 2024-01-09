import { Company } from "@/scripts/types/company";
import { FC } from "react";
import styles from "@/styles/sections/IndexSection/components/PreviewCard/index.module.css";
import { formatWithKanji } from "@/scripts/utils/format/format-with-kanji";
import NextLink from "next/link";
import { companySortableColumns } from "@/data/company";

type Props = {
  company: Company;
  selectedColumn: string;
};
export const PreviewCard: FC<Props> = ({ company, selectedColumn }) => {
  const columnObject = companySortableColumns.find(
    (column) => column.value == selectedColumn,
  )!;

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
            {selectedColumn !== "average_annual_salary" &&
              selectedColumn !== "average_age" && (
                <>
                  <div>{columnObject.label}</div>
                  <div>
                    {formatWithKanji(
                      company[columnObject.key as keyof Company] as number,
                    )}
                    {columnObject.unit}
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </NextLink>
  );
};
