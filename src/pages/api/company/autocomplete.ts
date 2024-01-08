import { supabase } from "@/scripts/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { Company } from "@/scripts/types/company";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { keyword } = req.query;
  const { data } = await supabase
    .from("Company")
    .select("name,securities_code")
    .like("name", `%${keyword}%`)
    .limit(6);
  res.status(200).json({
    data:
      data?.map(
        (d) =>
          ({
            securitiesCode: d.securities_code,
            name: d.name,
          }) as Pick<Company, "name" | "securitiesCode">,
      ) ?? [],
  });
}
