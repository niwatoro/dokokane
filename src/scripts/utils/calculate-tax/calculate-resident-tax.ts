type Props = {
  annualSalary: number;
  socialInsurancePremiums: number;
};
export const calculateResidentTax = ({
  annualSalary,
  socialInsurancePremiums,
}: Props) => {
  return (
    Math.floor(
      (annualSalary -
        calculateDeduction(annualSalary) -
        socialInsurancePremiums) *
        0.1,
    ) + 5000
  );
};

const calculateDeduction = (salary: number) => {
  if (salary < 1625000) {
    return 550000;
  } else if (salary < 1800000) {
    return salary * 0.4 - 100000;
  } else if (salary < 3600000) {
    return salary * 0.3 + 80000;
  } else if (salary < 6600000) {
    return salary * 0.2 + 440000;
  } else if (salary < 10000000) {
    return salary * 0.1 + 1100000;
  } else {
    return 1950000;
  }
};
