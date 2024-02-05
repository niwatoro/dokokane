import { Company } from "@/scripts/types/company";
import { FC } from "react";
import styles from "@/styles/sections/CompanySection/components/InfoTable/index.module.css";
import { Link } from "@nextui-org/link";
import { Industry } from "@/scripts/types/industry";
import { Skeleton } from "@nextui-org/react";

type Props = {
  company: Company;
  segments: Industry[] | null;
};
export const InfoTable: FC<Props> = ({ company, segments }) => {
  return (
    <div className={styles.container}>
      <table>
        <tbody>
          <tr>
            <td>証券コード</td>
            <td>
              <Link
                target={"_blank"}
                href={`https://minkabu.jp/stock/${company.securitiesCode}`}
              >
                {company.securitiesCode}
              </Link>
            </td>
          </tr>
          <tr>
            <td>セグメント</td>
            <td>
              {segments === null ? (
                <Skeleton />
              ) : segments.length === 0 ? (
                "なし"
              ) : (
                segments.map((segment, i) => (
                  <span key={i}>
                    <Link href={`/industry/${segment.id}`}>{segment.name}</Link>
                    {i < segments.length - 1 && "、"}
                  </span>
                ))
              )}
            </td>
          </tr>
          <tr>
            <td>売上高/売上収益</td>
            <td>{company.netSales.toLocaleString()}</td>
          </tr>
          <tr>
            <td>営業収益</td>
            <td>{company.operatingIncome.toLocaleString()}</td>
          </tr>
          <tr>
            <td>従業員数</td>
            <td>{company.numberOfEmployees.toLocaleString()}</td>
          </tr>
          <tr>
            <td>平均年間給与</td>
            <td>{company.averageAnnualSalary.toLocaleString()}</td>
          </tr>
          <tr>
            <td>平均年齢</td>
            <td>{company.averageAge}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
