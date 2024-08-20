import AdminLayout from "../components/layout/AdminLayout";
import Login from "../components/pages/Login";
import Admin from "../components/pages/Admin";
import AdminProductList from "../components/pages/AdminProductList";
import Detail from "../components/pages/Detail";
import Home from "../components/pages/Home";
import UserProfile from "../components/pages/UserProfile";
import SignUp from "../components/pages/SignUp";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "login",
    path: "/login",
    Element: Login,
  },
  {
    id: "signUp",
    path: "/sign-up",
    Element: SignUp,
  },
  {
    id: "userProfile",
    path: "/userProfile",
    Element: UserProfile,
    isPrivate: true,
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
    isPrivate: true,
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
