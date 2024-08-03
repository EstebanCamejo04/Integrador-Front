import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="navBar">
      <div>
        <Link to="/admin/products">Productos</Link>
        <Link to="/admin/products">Usuarios</Link>
        <Link to="/admin/products">Reservas</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
