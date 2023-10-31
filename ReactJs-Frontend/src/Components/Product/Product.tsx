import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import styles from "./Product.module.css";
import BodyComponent from "../Reusable-Components/Body/Body";
import { IProduct } from "../../Interfaces";
import { useCart, ADD_TO_CART } from "../../CartContext";
import { useState } from "react";

function ProductComponent() {
  const { id } = useParams();
  const fetchProduct = async (): Promise<IProduct> => {
    const response = await axios.get(`http://127.0.0.1:3000/product/${id}`);
    return response.data;
  };
  const { data, isLoading } = useQuery(["getProduct"], () => fetchProduct(), {
    keepPreviousData: true,
  });

  const [selectedQty, setSelectedQty] = useState(1);

  const handleQtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedQty(parseInt(event.target.value, 10));
  };

  const { dispatch } = useCart();
  const { cart } = useCart();
  console.log(cart);

  const addToCart = (product: IProduct, selectedQty: number) => {
    for (let i = 0; i < selectedQty; i++) {
      dispatch({ type: ADD_TO_CART, product });
    }
  };

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
            <img className={styles.productimage} src={data.image} alt="" />
            <div className={styles.details}>
              <div className={styles.productdescription}>
                <h3 className={styles.title}>{data.name}</h3>
                <div className={styles.review}>
                  <div></div>
                  <p>13 reviews</p>
                </div>
                <p className={styles.productprice}>Price: N{data.price}</p>
                <p className={styles.description}>
                  Description: {data.description}
                </p>
              </div>
              <div className={styles.cart}>
                <div className={styles.price}>
                  <p className={styles.paragraph}>Price:</p>
                  <p className={styles.paragraph}>N{data.price}</p>
                </div>
                <div className={styles.status}>
                  <p className={styles.paragraph}>Status:</p>
                  {data.countInStock > 0 ? (
                    <p className={styles.paragraph}>In Stock</p>
                  ) : (
                    <p className={styles.paragraph}>Out of Stock</p>
                  )}
                </div>
                <div className={styles.qty}>
                  <p className={styles.paragraph}>Qty:</p>
                  <select
                    className={styles.dropdown}
                    value={selectedQty}
                    onChange={handleQtyChange}
                  >
                    {Array.from({ length: data.countInStock }).map(
                      (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className={styles.buttoncontainer}>
                  <button
                    className={styles.button}
                    onClick={() => addToCart(data, selectedQty)}
                  >
                    Add to cart
                  </button>
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
