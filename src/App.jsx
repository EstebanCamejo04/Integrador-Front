import { Routes, Route, Link } from "react-router-dom";
import Detail from "./components/Detail";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Admin from "./Routes/Admin";
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Hola mundo</h1>

        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/administracion" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
