import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

export const initialState = {
  products: [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  validAdmin: false,
  validUser: false,
};

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
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
      };

    case "validateAdmin":
      return { ...state, validAdmin: action.payload };

    case "validateUser":
      return { ...state, validUser: action.payload };

    case "logout":
      localStorage.removeItem("user");
      return { ...state, user: null, openProfile: false };

    case "toggleDropDownMenu":
      return { ...state, openProfile: !state.openProfile };

    case "hiddeDropDownMenu":
      return { ...state, openProfile: false };

    default:
      return state;
  }
};

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = "http://localhost:3000/api/products";

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

  const checkRole = () => {
    if (!state.user) {
      dispatch({ type: "validateAdmin", payload: false });
      dispatch({ type: "validateUser", payload: false });
    } else if (state.user.role_id === 1) {
      axios
        .get("http://localhost:3000/user/checkAdmin", {
          withCredentials: true,
        })
        .then((response) => {
          dispatch({ type: "validateAdmin", payload: !!response });
        })
        .catch((error) => {
          dispatch({ type: "validateAdmin", payload: !error });
          console.error("Error al validar admin:", error);
        });
    } else if (state.user.role_id === 2) {
      axios
        .get("http://localhost:3000/user/checkUser", {
          withCredentials: true,
        })
        .then((response) => {
          dispatch({ type: "validateUser", payload: !!response });
        })
        .catch((error) => {
          dispatch({ type: "validateUser", payload: !error });
          console.error("Error al validar usuario:", error);
        });
    }
  };

  useEffect(() => {
    checkRole();
  }, [state.user]);

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
