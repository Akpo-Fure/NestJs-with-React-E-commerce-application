import { Link, useParams } from "react-router-dom";
import styles from "./Product.module.css";
import BodyComponent from "../Reusable-Components/Body/Body";
import axios from "axios";
import { useQuery } from "react-query";

function ProductComponent() {
  const { id } = useParams();
  const fetchProduct = async () => {
    const response = await axios.get(`http://127.0.0.1:3000/product/${id}`);
    console.log(response);
    return response;
  };
  const { data, isLoading } = useQuery(["getProduct"], () => fetchProduct(), {
    keepPreviousData: true,
  });
  if (isLoading) {
    return (
      <>
        <BodyComponent>
          <p>Loading...</p>
        </BodyComponent>
      </>
    );
  }
  if (data) {
    return (
      <>
        <BodyComponent>
          <Link className={styles.homelink} to="/">
            {" "}
            Go Back
          </Link>
          <div className={styles.product}>
            <img
              className={styles.productimage}
              src="https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s-mac-bluetooth-mouse/gallery/pale-grey/mx-master-3s-for-mac-mouse-top-view-pale-grey.png?v=1"
              alt=""
            />
            <div className={styles.details}>
              <div className={styles.productdescription}>
                <h3 className={styles.title}>
                  Airpords Wireless Bluetooth Headphones
                </h3>
                <div className={styles.review}>
                  <div></div>
                  <p>13 reviews</p>
                </div>
                <p className={styles.productprice}>Price: N20,000</p>
                <p className={styles.description}>
                  Description: Bluetooth technology lets you connect it with
                  compatible devices wirelessly High-quality AAC audio offers
                  immersive listening experience Built-in microphone
                </p>
              </div>
              <div className={styles.cart}>
                <div className={styles.price}>
                  <p className={styles.paragraph}>Price:</p>
                  <p className={styles.paragraph}>N20,000</p>
                </div>
                <div className={styles.status}>
                  <p className={styles.paragraph}>Status:</p>
                  <p className={styles.paragraph}>In Stock</p>
                </div>
                <div className={styles.buttoncontainer}>
                  <button className={styles.button}>Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </BodyComponent>
      </>
    );
  }
}

export default ProductComponent;
