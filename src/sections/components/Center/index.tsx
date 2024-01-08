import { FC, ReactNode } from "react";
import styles from "@/styles/sections/components/Center/index.module.css";

type Props = {
  children: ReactNode;
};
export const Center: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
