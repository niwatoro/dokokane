import { supabase } from "@/scripts/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { Company } from "@/scripts/types/company";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const { data } = await supabase.from("Company").select("*").eq("id", id);
  res.status(200).json({
    data:
      data && data.length > 0
        ? ({
            id: data[0].id,
            securitiesCode: data[0].securities_code,
            name: data[0].name,
            netSales: data[0].net_sales,
            operatingIncome: data[0].operating_income,
            averageAnnualSalary: data[0].average_annual_salary,
            averageAge: data[0].average_age,
            numberOfEmployees: data[0].number_of_employees,
            description: data[0].description,
            sourceUrl: data[0].source_url,
            sourceTitle: data[0].source_title,
          } as Company)
        : null,
  });
}
