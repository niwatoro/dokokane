import { supabase } from "@/scripts/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data } = await supabase
    .from("Industry")
    .select("*, CompanyIndustry(count)");
  res.status(200).json({
    data: (
      (data ?? []) as {
        id: number;
        name: string;
        CompanyIndustry: [{ count: number }];
      }[]
    )
      .sort((a, b) => b.CompanyIndustry[0].count - a.CompanyIndustry[0].count)
      .slice(0, 12),
  });
}
