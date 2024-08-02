import Admin from "../components/pages/Admin";
import Detail from "../components/pages/Detail";
import Home from "../components/pages/Home";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "detail",
    path: "/detail/:id",
    Element: Detail,
  },
  {
    id: "admin",
    path: "/admin",
    Element: Admin,
  },
];
