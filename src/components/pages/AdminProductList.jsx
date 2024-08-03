import AdminProductCard from "./AdminProductCard";
import "../../styles/AdminProductList.css";
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
    <div className="admin-products">
      {products.map((product) => {
        return <AdminProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default AdminProductList;
