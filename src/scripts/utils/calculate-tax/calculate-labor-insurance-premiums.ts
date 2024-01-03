// 労働保険料は、雇用保険料と労災保険料の合計を指す
// 雇用保険料は厚労省の以下のページを参考にした（23年11月3日時点）
// https://www.mhlw.go.jp/content/001050206.pdf
// 労災保険料は厚労省の以下のページを参考にした（23年11月3日時点）
// https://www.mhlw.go.jp/bunya/roudoukijun/roudouhokenpoint/dl/rousaihokenritu_h30.pdf

import injuryInsuranceRateByBusiness from "@/data/calculate-tax/injury-insurance-rate-by-business.json";
import type { Business } from "@/scripts/types/business";
import type { InsurancePremiums } from "@/scripts/types/insurance-premiums";

type Props = {
  businessType: Business;
  annualSalary: number;
};
export const calculateLaborInsurancePremiums = ({
  businessType,
  annualSalary,
}: Props): InsurancePremiums => {
  const monthlySalary = annualSalary / 12;
  if (monthlySalary < 0) {
    throw new Error("月給がマイナスになっています");
  }

  let employeeShare;
  let employerShare;

  // 雇用保険料
  if (
    [
      "水力発電施設、隧道等新設事業",
      "道路新設事業",
      "舗装工事業",
      "鉄道又は軌道新設事業",
      "建築事業",
      "既設建築物設備工事業",
      "機械装置の組立て又は据付けの事業",
      "その他の建設事業",
    ].includes(businessType)
  ) {
    employeeShare = (monthlySalary * 7) / 1000;
    employerShare = (monthlySalary * 11.5) / 1000;
  } else if (
    [
      "林業",
      "海面漁業",
      "定置網漁業又は海面魚類養殖業",
      "農業又は海面漁業以外の漁業",
    ].includes(businessType)
  ) {
    employeeShare = (monthlySalary * 7) / 1000;
    employerShare = (monthlySalary * 10.5) / 1000;
  } else {
    employeeShare = (monthlySalary * 6) / 1000;
    employerShare = (monthlySalary * 9.5) / 1000;
  }

  // 労災保険料
  employerShare +=
    (monthlySalary * injuryInsuranceRateByBusiness[businessType]) / 1000;

  return {
    employeeShare: Math.round(employeeShare) * 12,
    employerShare: Math.round(employerShare) * 12,
  };
};
