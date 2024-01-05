import { Prefecture } from "@/scripts/types/prefecture";
import { Business } from "@/scripts/types/business";
import { calculateLaborInsurancePremiums } from "@/scripts/utils/calculate-tax/calculate-labor-insurance-premiums";
import { calculateResidentTax } from "@/scripts/utils/calculate-tax/calculate-resident-tax";
import { calculateWithholdingTax } from "@/scripts/utils/calculate-tax/calculate-withholding-tax";
import { calculateSocialInsurancePremiums } from "@/scripts/utils/calculate-tax/calculate-social-insurance-premiums";

type Props = {
  annualSalary: number;
  isUnder40: boolean;
  prefecture: Prefecture;
  numberOfDependents: number;
  businessType: Business;
};
export const calculateTakeHomePay = ({
  annualSalary,
  isUnder40,
  prefecture,
  numberOfDependents,
  businessType,
}: Props) => {
  const socialInsurancePremiums = calculateSocialInsurancePremiums({
    isUnder40,
    annualSalary,
    prefecture,
  });
  const withholdingTax =
    calculateWithholdingTax({
      deductedMonthlyIncome:
        (annualSalary - socialInsurancePremiums.employeeShare) / 12,
      numberOfDependents,
    })! * 12;
  const residentTax = calculateResidentTax({
    annualSalary,
    socialInsurancePremiums: socialInsurancePremiums.employeeShare,
  });
  const laborInsurancePremiums = calculateLaborInsurancePremiums({
    businessType,
    annualSalary,
  });
  return {
    takeHomePay:
      annualSalary -
      socialInsurancePremiums.employeeShare -
      withholdingTax -
      residentTax -
      laborInsurancePremiums.employeeShare,
    socialInsurancePremiums: socialInsurancePremiums.employeeShare,
    laborInsurancePremiums: laborInsurancePremiums.employeeShare,
    withholdingTax,
    residentTax,
  };
};
