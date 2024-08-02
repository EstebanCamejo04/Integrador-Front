import { Routes, Route, Link } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Layout from "./layout/Layout";
import Admin from "./routes/Admin";
import "./styles/App.css";
import { routes } from "./utils/routes";
import AdminLayout from "./layout/AdminLayout";
import AdminProductList from "./components/AdminProductList";
function App() {
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path="/administracion" element={<AdminLayout />}>
            <Route path="/administracion" element={<Admin />}></Route>
            <Route
              path="/administracion/product-list"
              element={<AdminProductList />}
            ></Route>
          </Route>
          <Route path={`${routes.detail}/:id`} element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
