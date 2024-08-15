import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

export const initialState = {
  token: JSON.parse(localStorage.getItem("token")) || "",
};
console.log("Usuario recuperado del localStorage:", initialState.user);

const reducer = (state, action) => {
  switch (action.type) {
    case "getAllProducts":
      return { ...state, products: action.payload };

    case "removeProduct": {
      const filterProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      alert("Product removed from list successfully!");
      return { ...state, products: filterProducts };
    }

    case "login":
      localStorage.setItem("token", JSON.stringify(action.payload));
      return { ...state, token: action.payload };

    case "logout":
      localStorage.removeItem("user");
      return { ...state, user: null };

    default:
      return state;
  }
};

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
