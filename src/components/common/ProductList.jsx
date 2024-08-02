import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../../styles/ProductList.css";
import axios from "axios";

const ProductList = () => {
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    const fetchProductList = () => {
      axios
        .get("/db.json")
        .then((response) => {
          setProductList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the product list:", error);
        });
    };

    fetchProductList();
  }, [productList]);

  if (!productList) {
    return <div>Cargando...</div>;
  }

  return (
    <section>
      <h2>Experiencias recomendadas</h2>
      <div className="productList">
        {productList.map(({ id, name, image }) => {
          return <ProductCard key={id} id={id} img={image} name={name} />;
        })}
      </div>
    </section>
  );
};

export default ProductList;
