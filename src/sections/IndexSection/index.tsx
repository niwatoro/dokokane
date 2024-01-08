"use client";

import { Description } from "@/sections/IndexSection/components/Description";
import { Layout } from "@/sections/components/Layout";
import { PreviewCard } from "@/sections/IndexSection/components/PreviewCard";
import { Heading } from "@/sections/components/Heading";
import styles from "@/styles/sections/IndexSection/index.module.css";
import { useEffect, useState } from "react";
import { Company } from "@/scripts/types/company";
import { Spinner } from "@nextui-org/react";
import { Center } from "@/sections/components/Center";

export const IndexSection = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("/api/company/all");
      if (res.ok) {
        const json = await res.json();
        setCompanies(json.data);
      }
      setLoading(false);
    };

    fetchCompanies().catch(console.error);
  }, []);

  return (
    <Layout>
      <div>
        <Description />
        <Heading>企業一覧</Heading>
        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <div className={styles["preview-card-container"]}>
            {companies.map((company, i) => (
              <PreviewCard key={i} company={company} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
