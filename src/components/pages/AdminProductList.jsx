import AdminProductCard from "./AdminProductCard";
import styles from "../../styles/AdminProductList.module.css";
import { useContextGlobal } from "../../context/Context";

const AdminProductList = () => {
  const { state } = useContextGlobal();

  return (
    <div className={styles.adminProducts}>
      {state.products.map((product) => {
        return <AdminProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default AdminProductList;
