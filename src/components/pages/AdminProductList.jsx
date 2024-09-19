import AdminProductCard from "./AdminProductCard";
import styles from "../../styles/AdminProductList.module.css";
import { useContextGlobal } from "../../context/Context";
import { useEffect, useState } from "react";

const AdminProductList = () => {
  const { state, getAllProducts } = useContextGlobal();
  /* const [localState, setLocalState] = useState({ products: [] }); */

  useEffect(() => {
    getAllProducts();
  }, [state.edited]);

  return (
    <>
      <h2 className={styles.Title}>Lista de productos</h2>
      <div className={styles.adminProducts}>
        {state.products && state.products.length > 0 ? (
          state.products.map((product) => (
            <AdminProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </>
  );
};

export default AdminProductList;
