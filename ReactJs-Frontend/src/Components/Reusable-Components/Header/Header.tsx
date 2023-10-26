import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import cart from "./shopping-cart.svg";
import user from "./user.svg";

function HeaderComponent() {
  return (
    <>
      <main className={styles.header}>
        <div className={styles.headerContainer}>
          <Link className={styles.homeLink} to="/">
            <p className={styles.logo}>I</p>
            <h3>iCommerce</h3>
          </Link>
          <div className={styles.headerActions}>
            <Link className={styles.cart} to="/">
              <img src={cart} alt="" /> Cart
            </Link>
            <Link className={styles.user} to="/">
              <img src={user} alt="" /> Sign in
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default HeaderComponent;
