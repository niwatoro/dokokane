import Head from "next/head";
import { CompanySection } from "@/sections/CompanySection";
import { Company } from "@/scripts/types/company";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Center } from "@/sections/components/Center";

export default function Home() {
  const { id } = useRouter().query;

  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) {
        return;
      }

      const res = await fetch(`/api/company/detail?id=${id}`);
      if (res.ok) {
        const json = await res.json();
        setCompany(json.data);
      }
      setLoading(false);
    };

    fetchCompany().catch(console.error);
  }, [id]);

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!company) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Head>
        <title>ドコカネ - {company.name}</title>
        <meta name="description" content={`ドコカネ - ${company.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CompanySection company={company} />
      </main>
    </>
  );
}
