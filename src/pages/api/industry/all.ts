import { supabase } from "@/scripts/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data } = await supabase.from("Industry").select("*");
  res.status(200).json({ data });
}
