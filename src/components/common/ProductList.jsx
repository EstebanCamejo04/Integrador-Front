import React, { useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../../styles/ProductList.module.css";
import { useContextGlobal } from "../../context/Context";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import searchStyles from "../../styles/SearchProducts.module.css";

const ProductList = () => {
  const { state } = useContextGlobal();
  const [search, setSearch] = useState({
    words: "",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  const searchProducts = (e) => {
    console.log("buscando productos");
  };
  const updateState = (e, key) => {
    setSearch({
      ...search,
      key: e.target.value,
    });
  };

  if (!state.products) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <section className={searchStyles.searchProduct}>
        <h3>Realizar búsqueda</h3>
        <p>
          Puedes buscar por palabras clave, frases específicas, nombres,
          categoría o ubicación{" "}
        </p>
        <form onSubmit={searchProducts}>
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Selecciona un rango de fechas"
            className="form-control"
          />

          <input
            type="text"
            name="words"
            placeholder="Buscar productos"
            value={search.words}
            onChange={updateState}
          />

          <button type="submit">Realizar búsqueda</button>
        </form>
      </section>
      <section className={styles.productListContainer}>
        <h2 className={styles.productListTitle}>Experiencias recomendadas</h2>
        <div className={styles.productList}>
          {shuffleArray(state.products).map(({ id, name }) => {
            return <ProductCard key={id} id={id} name={name} />;
          })}
        </div>
      </section>
    </>
  );
};

export default ProductList;
