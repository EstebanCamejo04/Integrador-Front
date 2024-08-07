import AdminProductCard from "./AdminProductCard";
import styles from "../../styles/AdminProductList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/db.json")
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
      });
  }, []);

  return (
    <div className={styles.adminProducts}>
      {products.map((product) => {
        return <AdminProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default AdminProductList;
