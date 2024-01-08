import { supabase } from "@/scripts/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { Company } from "@/scripts/types/company";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data } = await supabase.from("Company").select("*").limit(12);
  res.status(200).json({
    data:
      data?.map(
        (d) =>
          ({
            securitiesCode: d.securities_code,
            name: d.name,
            netSales: d.net_sales,
            operatingIncome: d.operating_income,
            averageAnnualSalary: d.average_annual_salary,
            averageAge: d.average_age,
            numberOfEmployees: d.number_of_employees,
            sourceUrl: d.source_url,
            sourceTitle: d.source_title,
          }) as Company,
      ) ?? [],
  });
}
