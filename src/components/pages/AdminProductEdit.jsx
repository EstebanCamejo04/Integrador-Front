import React from "react";
import ModalProductEdit from "../common/ModalProductEdit";
import { Table, Button, Container } from "reactstrap";
import { useContextGlobal } from "../../context/Context";
import styles from "../../styles/AdminUserList.module.css";

const AdminProductEdit = () => {
  const { state, dispatch } = useContextGlobal();
  return (
    <>
      <div>
        <br />

        <table className={styles.tableWrapper}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen-url</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {state.products.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.name}</td>
                <td>{dato.description}</td>
                <td>{dato.price}</td>
                <td>{dato.image_url}</td>
                <td>{dato.category.name}</td>

                <td>
                  <Button
                    color="primary"
                    onClick={() =>
                      dispatch({ type: "showModalUpdate", payload: dato })
                    }
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    color="danger"
                    onClick={() =>
                      dispatch({ type: "removeProduct", payload: dato.id })
                    }
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalProductEdit />
    </>
  );
};

export default AdminProductEdit;
