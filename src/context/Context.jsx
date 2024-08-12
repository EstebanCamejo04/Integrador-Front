import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const products = JSON.parse(localStorage.getItem("products")) || [];

export const initialState = { products: products };

const reducer = (state, action) => {
  switch (action.type) {
    case "getAllProducts":
      return { products: action.payload };

    case "removeProduct":
      const filterProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      alert("Product removed from list successfully!");
      return { products: filterProducts };
  }
};

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(state.products));
  }, [state.products]);

  const url = "/db.json";

  const getAllProducts = () => {
    axios
      .get(url)
      .then((response) => {
        dispatch({ type: "getAllProducts", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching the product list:", error);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => useContext(ContextGlobal);
