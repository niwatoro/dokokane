import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import styles from "@/styles/components/Header/index.module.css";
import { Kaisei_HarunoUmi } from "next/font/google";
import { industries } from "@/data/industry";
import NextLink from "next/link";
import path from "path";

const kaiseiHarunoUmi = Kaisei_HarunoUmi({ subsets: [], weight: "700" });

export const Header = () => {
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
      </Navbar>
      <Navbar
        className={styles["industry-container"]}
        height={"auto"}
        position={"static"}
      >
        <NavbarContent className={styles["industry-content"]}>
          {industries.map((industry, i) => (
            <NavbarItem key={i}>
              <NextLink
                className={styles["industry-link"]}
                href={path.join("/industry", industry.href)}
              >
                {industry.name}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
    </>
  );
};
