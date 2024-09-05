import { Link } from "react-router-dom";
import styles from "../../styles/AdminNavbar.module.css";

const AdminNavbar = () => {
  return (
    <nav className="navBar">
      <h2 className={styles.Title}>Panel de Administrador</h2>
      <div className={styles.AdminNavbar}>
        <Link to="/admin/products">Productos</Link>
        <Link to="/admin/createProduct">Crear Producto</Link>
        <Link to="/admin/products_edit">Editar Productos</Link>
        <Link to="/admin/users">Usuarios</Link>
        <Link to="/admin/products">Reservas</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
