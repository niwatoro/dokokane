import { FC, ReactNode } from "react";
import styles from "@/styles/sections/components/Layout/index.module.css";

type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
