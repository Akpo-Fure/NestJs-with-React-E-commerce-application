import styles from "./Body.module.css";

function BodyComponent() {
  return (
    <>
      <body className={styles.body}>
        <main className={styles.main}>Products</main>
      </body>
    </>
  );
}

export default BodyComponent;
