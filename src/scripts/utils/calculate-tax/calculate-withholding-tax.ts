// 源泉徴収税額を計算する
// 国税庁の源泉徴収税額表を参考にした（2023年11月4日時点）
// https://www.nta.go.jp/publication/pamph/gensen/zeigakuhyo2021/02.htm

import withholdingTaxRate from "@/data/calculate-tax/withholding-tax-rate.json";
import withholdingTaxTable from "@/data/calculate-tax/withholding-tax-table.json";

type WithholdingTaxTable = {
  [key: string]: {
    [key: string]: number;
  };
};
type WithholdingTaxRate = {
  [key: string]: number;
};

type Props = {
  deductedMonthlyIncome: number;
  numberOfDependents: number;
};
export const calculateWithholdingTax = ({
  deductedMonthlyIncome,
  numberOfDependents,
}: Props) => {
  if (deductedMonthlyIncome < 0) {
    throw new Error("控除後の月給がマイナスになっています");
  }
  if (numberOfDependents < 0) {
    throw new Error("扶養家族数がマイナスになっています");
  }
  if (!Number.isInteger(numberOfDependents)) {
    throw new Error("扶養家族数が整数ではありません");
  }

  for (const max of Object.keys(withholdingTaxTable)) {
    let tax = null;

    if (max.includes("+")) {
      tax =
        (withholdingTaxTable as WithholdingTaxTable)[max][
          Math.min(numberOfDependents, 7).toString()
        ] +
        ((deductedMonthlyIncome - 3500000) *
          (withholdingTaxRate as WithholdingTaxRate)[max]) /
          100;
    }

    if (Number(max) && deductedMonthlyIncome < Number(max)) {
      tax = (withholdingTaxTable as WithholdingTaxTable)[max][
        Math.min(numberOfDependents, 7).toString()
      ];
      if (Object.keys(withholdingTaxRate).includes(max)) {
        tax +=
          ((deductedMonthlyIncome -
            (withholdingTaxTable as WithholdingTaxTable)[max]["floor"]) *
            (withholdingTaxRate as WithholdingTaxRate)[max]) /
          100;
      }
    }

    if (tax) {
      if (numberOfDependents > 7) {
        return Math.max(Math.round(tax - (numberOfDependents - 7) * 1610), 0);
      } else {
        return Math.round(tax);
      }
    }
  }
};
