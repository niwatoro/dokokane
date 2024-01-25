import { supabase } from "@/scripts/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { Company } from "@/scripts/types/company";
import {
  convertFullToHalf,
  convertHalfToFull,
} from "@/scripts/utils/format/format-with-width";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { keyword } = req.query;
  if (!keyword || Array.isArray(keyword)) {
    res.status(400).json({
      data: [],
    });
    return;
  }

  const { data } = await supabase
    .from("Company")
    .select("name,id")
    .or(
      `name.like.*${convertHalfToFull(keyword)}*,name.like.*${convertFullToHalf(
        keyword,
      )}*`,
    )
    .limit(6);
  res.status(200).json({
    data:
      data?.map(
        (d) =>
          ({
            id: d.id,
            name: d.name,
          }) as Pick<Company, "name" | "id">,
      ) ?? [],
  });
}
