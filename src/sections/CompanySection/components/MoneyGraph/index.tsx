import { Company } from "@/scripts/types/company";
import { FC, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import styles from "@/styles/sections/CompanySection/components/MoneyGraph/index.module.css";
import { calculateTakeHomePay } from "@/scripts/utils/calculate-tax/calculate-take-home-pay";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { prefectures } from "@/data/prefecture";
import { Prefecture } from "@/scripts/types/prefecture";
import { Heading } from "@/sections/components/Heading";

const barOptions = {
  chart: {
    type: "bar",
  },
  title: {
    text: null,
  },
  plotOptions: {
    series: {
      stacking: "normal",
      dataLabels: {
        enabled: true,
        formatter: function () {
          const y = (this as any).y as number;
          if (y === 0) {
            return null;
          }
          return y.toLocaleString().replace(/,/g, " ");
        },
      },
    },
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    categories: ["一人当たり売上高", "一人当たり利益と費用"],
  },
  yAxis: {
    title: {
      text: "円",
    },
    labels: {
      formatter: function () {
        return (this as any).value / 10000 + "万";
      },
    },
  },
} as const;

const pieOptions = {
  chart: {
    type: "pie",
  },
  plotOptions: {
    series: {
      dataLabels: [
        {
          enabled: true,
          distance: 20,
          format: "{point.name}: {point.percentage:.0f}%",
        },
        {
          enabled: true,
          distance: -40,
          formatter: function () {
            return Math.round((this as any).y / 10000) + "万";
          },
          style: {
            fontSize: "1.2em",
            textOutline: "none",
            opacity: 0.7,
          },
          filter: {
            operator: ">",
            property: "percentage",
            value: 5,
          },
        },
      ],
    },
  },
} as const;

type Props = {
  company: Company;
};
export const MoneyGraph: FC<Props> = ({ company }) => {
  const [numberOfDependents, setNumberOfDependents] = useState(3);
  const [isUnder40, setIsUnder40] = useState(true);
  const [prefecture, setPrefecture] = useState<Prefecture>("東京");

  const {
    takeHomePay,
    socialInsurancePremiums,
    laborInsurancePremiums,
    withholdingTax,
    residentTax,
  } = calculateTakeHomePay({
    annualSalary: company.averageAnnualSalary,
    numberOfDependents,
    isUnder40,
    prefecture,
    businessType: "その他の各種事業",
  });

  return (
    <div className={styles.container}>
      <Heading>お金の流れ</Heading>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...barOptions,
          series: [
            {
              name: "売上高",
              data: [
                Math.round(company.netSales / company.numberOfEmployees),
                0,
              ],
            },
            {
              name: "給与",
              data: [0, company.averageAnnualSalary],
            },
            {
              name: "給与以外の費用",
              data: [
                0,
                Math.round(
                  (company.netSales - company.operatingIncome) /
                    company.numberOfEmployees -
                    company.averageAnnualSalary,
                ),
              ],
            },
            {
              name: "会社の利益（営業利益）",
              data: [
                0,
                Math.round(company.operatingIncome / company.numberOfEmployees),
              ],
            },
          ],
        }}
      />
      <Heading>手取り</Heading>
      <div className={styles["input-container"]}>
        <Input
          type={"number"}
          label={"扶養親族の数"}
          variant={"bordered"}
          value={numberOfDependents.toString()}
          onChange={(e) => setNumberOfDependents(Number(e.target.value))}
          className={"max-w-xs"}
        />
        <Select
          label={"住所"}
          variant={"bordered"}
          selectedKeys={[prefecture]}
          onChange={(event) => {
            if (event.target.value) {
              setPrefecture(event.target.value as Prefecture);
            }
          }}
          className={"max-w-xs"}
        >
          {prefectures.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </Select>
        <div>
          <Checkbox isSelected={isUnder40} onValueChange={setIsUnder40}>
            40歳未満
          </Checkbox>
        </div>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...pieOptions,
          title: {
            text: `給与総額：${Math.round(
              company.averageAnnualSalary / 10000,
            )}万円`,
          },
          series: [
            {
              name: "給与内訳",
              data: [
                {
                  name: "手取り",
                  y: takeHomePay,
                },
                {
                  name: "社会保険料",
                  y: socialInsurancePremiums + laborInsurancePremiums,
                },
                {
                  name: "源泉徴収税",
                  y: withholdingTax,
                },
                {
                  name: "住民税",
                  y: residentTax,
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
};
