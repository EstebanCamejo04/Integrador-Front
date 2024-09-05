import AdminProductCard from "./AdminProductCard";
import styles from "../../styles/AdminProductList.module.css";
import { useContextGlobal } from "../../context/Context";
import { useEffect } from "react";

const AdminProductList = () => {
  const { state, getAllProducts } = useContextGlobal();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h2 className={styles.Title}>Lista de productos</h2>
      <div className={styles.adminProducts}>
        {state.products.map((product) => {
          return <AdminProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default AdminProductList;
