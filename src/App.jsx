import { Routes, Route, Link } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Layout from "./Layout/Layout";
import Admin from "./Routes/Admin";
import "./styles/App.css";
import { routes } from "./utils/routes";
function App() {
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path="/administracion" element={<Admin />} />
          <Route path={`${routes.detail}/:id`} element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
