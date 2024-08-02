import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="navBar">
      <div>
        <Link to="/administracion/product-list">Productos</Link>
        <Link to="/administracion/product-list">Usuarios</Link>
        <Link to="/administracion/product-list">Reservas</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
