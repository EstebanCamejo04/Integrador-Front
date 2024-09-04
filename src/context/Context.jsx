import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

export const initialState = {
  products: [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  validAdmin: false,
  validUser: false,
  modalUpdate: false,
  form: {
    id: "",
    name: "",
    description: "",
    image_url: "",
    price: "",
    category_id: "",
    category: {
      id: "",
      name: "",
      description: "",
    },
  },
  productsCategory: "",
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

    case "showModalUpdate":
      return { ...state, modalUpdate: true, form: action.payload };

    case "cancelModalUpdate":
      return { ...state, modalUpdate: false };

    case "editModalUpdate":
      return { ...state, modalUpdate: false, products: action.payload };

    case "handleChange":
      return { ...state, form: action.payload };

    case "getProductsCategory":
      return { ...state, productsCategory: action.payload };

    default:
      return state;
  }
};

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = "http://localhost:3000/api/products";

  const urlCategory = "http://localhost:3000/api/products_categories";

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

  const removeProduct = (productId) => {
    console.log("hola");

    axios
      .delete(`${url}/${productId}`)
      .then(() => {
        dispatch({ type: "removeProduct", payload: productId });
      })
      .catch((error) => {
        console.error("Error deleting the product:", error);
        alert("Failed to delete the product.");
      });
  };

  const updateProduct = (updatedData) => {
    axios
      .put(url, updatedData)
      .then((response) => {
        // Actualizamos el estado con el producto actualizado
        dispatch({ type: "editModalUpdate", payload: updatedData });
      })
      .catch((error) => {
        console.error("Error updating the product:", error);
        alert("Failed to update the product.");
      });
  };

  const getProductsCategory = () => {
    axios
      .get(urlCategory)
      .then((response) => {
        dispatch({ type: "getProductsCategory", payload: response.data });
      })
      .catch((error) => {
        console.error("Failed to fetch all products categories", error);
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

  useEffect(() => {
    getProductsCategory();
  }, []);

  return (
    <ContextGlobal.Provider
      value={{ state, dispatch, removeProduct, updateProduct }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => useContext(ContextGlobal);
