import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import BodyComponent from "../Reusable-Components/Body/Body";

function ProductComponent() {
  return (
    <>
      <BodyComponent>
        <Link className={styles.homelink} to="/">
          {" "}
          Go Back
        </Link>
        <div>
          <img
            className={styles.productimage}
            src="https://www.computerhope.com/cdn/computer-mouse.png"
            alt=""
          />
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </BodyComponent>
    </>
  );
}

export default ProductComponent;
