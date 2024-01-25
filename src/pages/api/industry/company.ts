import { supabase } from "@/scripts/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { companyId } = req.query;
  const { data } = await supabase
    .from("CompanyIndustry")
    .select("Industry (id, name)")
    .eq("company_id", companyId);
  res.status(200).json({
    data:
      (data as { Industry: { id: number; name: string } }[] | null)?.map(
        (d) => ({
          id: d.Industry.id,
          name: d.Industry.name,
        }),
      ) ?? [],
  });
}
