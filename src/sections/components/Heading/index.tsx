import { FC, ReactNode } from "react";
import styles from "@/styles/sections/components/Heading/index.module.css";

type Props = {
  children: ReactNode;
};
export const Heading: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
