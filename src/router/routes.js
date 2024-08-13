import AdminLayout from "../components/layout/AdminLayout";
import LoginForm from "../components/layout/LoginForm";
import Admin from "../components/pages/Admin";
import AdminProductList from "../components/pages/AdminProductList";
import Detail from "../components/pages/Detail";
import Home from "../components/pages/Home";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "login",
    path: "/login",
    Element: LoginForm,
  },
  {
    id: "detail",
    path: "/detail/:id",
    Element: Detail,
  },
  {
    id: "admin",
    path: "/admin",
    Element: AdminLayout,
    children: [
      {
        id: "admin-home",
        path: "/admin",
        Element: Admin,
      },
      {
        id: "admin-products",
        path: "/admin/products",
        Element: AdminProductList,
      },
    ],
  },
];
