// 社会保険料は狭義の定義を採用し、健康保険料、厚生年金保険料、介護保険料の合計を指す
// 全国健康保険協会公式サイトを参考にした（23年11月3日時点）
// https://www.kyoukaikenpo.or.jp/g7/cat330/sb3150/r04/r4ryougakuhyou3gatukara/

import healthInsuranceRateByPrefecture from "@/data/calculate-tax/health-insurance-rate-by-prefecture.json";
import healthInsuranceRegularSalary from "@/data/calculate-tax/health-insurance-regular-salary.json";
import type { InsurancePremiums } from "@/scripts/types/insurance-premiums";
import type { Prefecture } from "@/scripts/types/prefecture";

type Props = {
  isUnder40: boolean;
  annualSalary: number;
  prefecture: Prefecture;
};
export const calculateSocialInsurancePremiums = ({
  isUnder40,
  annualSalary,
  prefecture,
}: Props): InsurancePremiums => {
  const monthlySalary = annualSalary / 12;
  if (monthlySalary < 0) {
    throw new Error("月給がマイナスになっています");
  }

  const regularSalary = calculateRegularSalary(monthlySalary);

  // 健康保険料
  let sip = (regularSalary * healthInsuranceRateByPrefecture[prefecture]) / 100;
  if (!isUnder40) {
    // 介護保険料
    sip += (regularSalary * 1.82) / 100;
  }
  // 厚生年金保険料
  sip += (Math.min(Math.max(regularSalary, 88000), 650000) * 18.3) / 100;

  return {
    employeeShare: Math.round(sip / 2) * 12,
    employerShare: Math.round(sip / 2) * 12,
  };
};

type HealthInsuranceRegularSalary = {
  [key: string]: number;
};
const calculateRegularSalary = (monthlySalary: number) => {
  for (const upperLimit of Object.keys(healthInsuranceRegularSalary)) {
    if (upperLimit.includes("+")) {
      return (healthInsuranceRegularSalary as HealthInsuranceRegularSalary)[
        upperLimit
      ];
    }
    if (monthlySalary < Number(upperLimit)) {
      return (healthInsuranceRegularSalary as HealthInsuranceRegularSalary)[
        upperLimit
      ];
    }
  }
  throw new Error("健康保険料の計算に失敗しました");
};
