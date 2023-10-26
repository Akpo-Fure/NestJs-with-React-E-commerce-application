import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import BodyComponent from "../Reusable-Components/Body/Body";

function HomeComponent() {
  interface IProduct {
    id: string;
    name: string;
    price: number;
  }

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
                <img
                  className={styles.productimage}
                  src="https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s-mac-bluetooth-mouse/gallery/pale-grey/mx-master-3s-for-mac-mouse-top-view-pale-grey.png?v=1"
                  alt=""
                />
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
