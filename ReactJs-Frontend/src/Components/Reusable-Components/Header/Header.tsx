import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import cartt from "./shopping-cart.svg";
import user from "./user.svg";
import { useCart } from "../../../CartContext";

function HeaderComponent() {
  const { cart } = useCart();
  console.log(cart);
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
              <img src={cartt} alt="" /> Cart
            </Link>
            <Link className={styles.user} to="/login">
              <img src={user} alt="" /> Sign in
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default HeaderComponent;
