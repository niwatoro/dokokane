import styles from "@/styles/sections/IndexSection/components/Description/index.module.css";

export const Description = () => {
  return (
    <div className={styles.container}>
      <p>会社では何円稼ぎましたか？</p>
      <p>そのうち何円貰いましたか？</p>
      <p>そこから何円使えますか？</p>
    </div>
  );
};
