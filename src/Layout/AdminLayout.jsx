import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="layout">
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
