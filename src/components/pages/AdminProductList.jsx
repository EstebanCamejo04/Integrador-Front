import AdminProductCard from "./AdminProductCard";
import styles from "../../styles/AdminProductList.module.css";
import { useContextGlobal } from "../../context/Context";

const AdminProductList = () => {
  const { state } = useContextGlobal();

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className={styles.adminProducts}>
      {state.products.map((product) => {
        return <AdminProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default AdminProductList;
