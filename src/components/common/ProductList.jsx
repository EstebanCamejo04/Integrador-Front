import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../../styles/ProductList.module.css";
import { useContextGlobal } from "../../context/Context";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import searchStyles from "../../styles/SearchProducts.module.css";
import axios from "axios";

const ProductList = () => {
  const keyWords = [
    "playa",
    "juegos",
    "cerro",
    "hamaca",
    "highline",
    "Senderismo",
  ];
  const { state, getAllProducts } = useContextGlobal();
  const [search, setSearch] = useState({
    words: "",
    products: [],
    startDate: null,
    endDate: null,
    suggestionWords: [],
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    setSearch({
      ...search,
      products: shuffleArray(state.products),
    });
  }, [state.products]);

  const updateState = (e) => {
    setSearch({
      ...search,
      suggestionWords: e.target.value
        ? keyWords.filter((key) => {
            return key.toLowerCase().includes(e.target.value.toLowerCase());
          })
        : [],
      [e.target.name]: e.target.value,
    });
  };
  const wordSelected = (e) => {
    setSearch({
      ...search,
      words: e.target.textContent,
      suggestionWords: e.target.textContent
        ? keyWords.filter((key) => {
            return key
              .toLowerCase()
              .includes(e.target.textContent.toLowerCase());
          })
        : [],
    });
  };
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
    e.preventDefault();
    e.stopPropagation();
    if ((search.startDate && search.endDate) || search.words) {
      const url = "http://localhost:3000/api/search-products";
      axios
        .get(url, {
          params: {
            words: search.words,
            start: search.startDate
              ? search.startDate.toISOString().split("T")[0]
              : null,
            end: search.endDate
              ? search.endDate.toISOString().split("T")[0]
              : null,
          },
        })
        .then((response) => {
          setSearch({
            ...search,
            products: response.data,
          });
        })
        .catch((error) => {
          console.error("Error searching the product list:", error);
        });
    } else {
      setSearch({
        ...search,
        products: shuffleArray(state.products),
      });
    }
  };

  if (!state.products) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <section className={searchStyles.searchProduct}>
        <h3>Realizar búsqueda</h3>
        <p>
          Puedes buscar por palabras clave, rango de fechas, descripción,
          nombre, categoría o ubicación de la experiencia{" "}
        </p>
        <form onSubmit={searchProducts}>
          <div>
            <DatePicker
              selected={search.startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setSearch({
                  ...search,
                  startDate: start,
                  endDate: end,
                });
              }}
              startDate={search.startDate}
              endDate={search.endDate}
              selectsRange
              placeholderText="Selecciona un rango de fechas"
            />
          </div>
          <div className={searchStyles.words}>
            <input
              type="text"
              name="words"
              placeholder="Buscar productos"
              value={search.words}
              onChange={updateState}
              autoComplete="off"
            />
            {search.suggestionWords.length > 0 && (
              <ul>
                {search.suggestionWords.map((word, i) => {
                  return (
                    <li key={i} onClick={wordSelected}>
                      {word}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className={
              search.startDate && !search.endDate
                ? searchStyles.disableButton
                : ""
            }
          >
            Realizar búsqueda
          </button>
        </form>
      </section>
      <section className={styles.productListContainer}>
        <h2 className={styles.productListTitle}>Experiencias recomendadas</h2>
        <div className={styles.productList}>
          {search.products.map((item) => {
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                imageKey={item.imageKey}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductList;
