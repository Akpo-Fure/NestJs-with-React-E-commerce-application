import { ReactNode } from "react";
import styles from "./Body.module.css";

function BodyComponent({ children }: { children: ReactNode }) {
  return (
    <>
      <body className={styles.body}>
        <main className={styles.main}>{children}</main>
      </body>
    </>
  );
}

export default BodyComponent;
