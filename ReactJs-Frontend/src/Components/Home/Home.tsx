import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { IProduct } from "../../Interfaces";
import styles from "./Home.module.css";
import BodyComponent from "../Reusable-Components/Body/Body";

function HomeComponent() {
  const fetchProducts = async () => {
    const response = await axios.get("http://127.0.0.1:3000/product");
    return response.data;
  };

  const { data, isLoading } = useQuery(["getProducts"], () => fetchProducts(), {
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
          <h1 className={styles.header}>Latest Products</h1>
          <div className={styles.gridcontainer}>
            {data.map((data: IProduct) => (
              <Link
                className={styles.flexcontainer}
                to={`/product/id/${data.id}`}
              >
                <img className={styles.productimage} src={data.image} alt="" />
                <h4 className={styles.producttitle}>{data.name}</h4>
                <div className={styles.reviews}>1 reviews</div>
                <p className={styles.price}>₦{data.price}</p>
              </Link>
            ))}
          </div>
        </BodyComponent>
      </>
    );
  }
}

export default HomeComponent;
