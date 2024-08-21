import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/AdminUserList.module.css";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/users", {
          withCredentials: true,
        });
        console.log("Fetched users:", response.data);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId) => {
    try {
      const currentUser = users.find((user) => user.id === userId);
      const newRoleId = currentUser.role.role === "ADMIN" ? 2 : 1;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: {
                  ...user.role,
                  role: user.role.role === "ADMIN" ? "USER" : "ADMIN",
                },
              }
            : user
        )
      );

      await axios.put(
        `http://localhost:3000/admin/users/${userId}/change-role`,
        { newRoleId },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      setError("Failed to update role");
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.Title}>Lista de usuarios</h2>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              console.log("Rendering user:", user);
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.role.role}</td>
                  <td>
                    <button
                      className={styles.roleButton}
                      onClick={() => handleRoleChange(user.id)}
                    >
                      {user.role.role === "ADMIN"
                        ? "Revocar Administrador"
                        : "Otorgar Administrador"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;
