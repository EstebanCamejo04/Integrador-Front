import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { API_BASE_URL } from "../utils/appConstants";

export const initialState = {
  edited: 1,
  products: [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  validAdmin: JSON.parse(localStorage.getItem("user"))?.role_id === 1 || false,
  validUser: JSON.parse(localStorage.getItem("user"))?.role_id === 2 || false,
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
  productsCategory: [],
  reservations: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "edited":
      console.log("cerdito", action.payload);

      return { ...state, edited: action.payload };
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
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.token).replace(/^"|"$/g, "")
      );
      console.log(
        "TOKEN_" + JSON.stringify(action.payload.token).replace(/^"|"$/g, "")
      );
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
      localStorage.removeItem("token");
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
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload ? action.payload : product
      );
      return { ...state, modalUpdate: false, products: updatedProducts };

    case "handleChange":
      return { ...state, form: action.payload };

    case "getProductsCategory":
      return { ...state, productsCategory: action.payload };

    case "addReservation":
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };

    default:
      return state;
  }
};

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = `${API_BASE_URL}:3000/api/products`;

  const urlCategory = `${API_BASE_URL}:3000/api/products_categories`;

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
        .get(`${API_BASE_URL}:3000/user/checkAdmin`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
        .get(`${API_BASE_URL}:3000/user/checkUser`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const addReservation = (reservationData) => {
    axios
      .post(`${API_BASE_URL}:3000/api/reservations`, reservationData)
      .then((response) => {
        dispatch({ type: "addReservation", payload: response.data });
        console.log("Reserva agregada:", reservationData);
        alert("Reserva confirmada con éxito");
      })
      .catch((error) => {
        console.error("Error al realizar la reserva:", error);
        alert("Error al realizar la reserva");
      });
  };

  return (
    <ContextGlobal.Provider
      value={{
        state,
        dispatch,
        getAllProducts,
        removeProduct,
        updateProduct,
        getProductsCategory,
        addReservation,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => useContext(ContextGlobal);
