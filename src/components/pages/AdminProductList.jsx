import AdminProductCard from "./AdminProductCard";
import styles from "../../styles/AdminProductList.module.css";
import { useContextGlobal } from "../../context/Context";
import { useEffect, useState } from "react";

const AdminProductList = () => {
  const { state, getAllProducts } = useContextGlobal();
 const [localState, setLocalState] = useState({ products: [] });

  useEffect(() => {
    getAllProducts();
        setLocalState({products: state.products})
  }, [state.products]);

  return (
    <>
      <h2 className={styles.Title}>Lista de productos</h2>
      <div className={styles.adminProducts}>
                {localState.products && localState.products.length > 0 ? (
                    localState.products.map((product) => (
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
