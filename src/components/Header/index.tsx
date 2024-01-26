import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from "@nextui-org/react";
import styles from "@/styles/components/Header/index.module.css";
import { Kaisei_HarunoUmi } from "next/font/google";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Industry } from "@/scripts/types/industry";
import { SearchBar } from "@/components/Header/components/SearchBar";

const kaiseiHarunoUmi = Kaisei_HarunoUmi({ subsets: [], weight: "700" });

export const Header = () => {
  const [industries, setIndustries] = useState<Industry[] | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      const res = await fetch("/api/industry/header");
      if (res.ok) {
        const json = await res.json();
        setIndustries(json.data);
      }
    };

    fetchIndustries().catch(console.error);
  }, []);

  return (
    <>
      <Navbar position={"static"}>
        <NavbarBrand>
          <NextLink
            className={`${styles.logo} ${kaiseiHarunoUmi.className}`}
            href={"/"}
          >
            ドコカネ
          </NextLink>
        </NavbarBrand>
        <NavbarContent>
          <SearchBar />
        </NavbarContent>
      </Navbar>
      <Navbar
        className={styles["industry-container"]}
        height={"auto"}
        position={"static"}
      >
        <NavbarContent className={styles["industry-content"]}>
          {industries ? (
            industries.map((industry, i) => (
              <NavbarItem key={i}>
                <NextLink
                  className={styles["industry-link"]}
                  href={`/industry/${industry.id}`}
                >
                  {industry.name}
                </NextLink>
              </NavbarItem>
            ))
          ) : (
            <Skeleton className={"h-6 w-full rounded"} />
          )}
        </NavbarContent>
        <NavbarItem>
          <NextLink className={styles["industry-link"]} href={"/industry"}>
            もっと見る
          </NextLink>
        </NavbarItem>
      </Navbar>
    </>
  );
};
