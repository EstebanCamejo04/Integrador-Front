import React from "react";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useContextGlobal } from "../../context/Context";
import { FormSelect } from "react-bootstrap";

const ModalProductEdit = () => {
  const { state, dispatch } = useContextGlobal();

  const handleChange = (e) => {
    dispatch({
      type: "handleChange",
      payload: { ...state.form, [e.target.name]: e.target.value },
    });
  };

  const edit = (dato) => {
    let contador = 0;
    let arreglo = state.products;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].name = dato.name;
        arreglo[contador].description = dato.description;
        arreglo[contador].price = dato.price;
        arreglo[contador].image_url = dato.image_url;
        arreglo[contador].category_id = dato.category_id;
      }

      contador++;
    });
    dispatch({ type: "editModalUpdate", payload: arreglo });
  };
  return (
    <>
      <Modal isOpen={state.modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Producto</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={state.form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleChange}
              value={state.form.name}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              name="description"
              type="text"
              onChange={handleChange}
              value={state.form.description}
            />
          </FormGroup>

          <FormGroup>
            <label>Precio:</label>
            <input
              className="form-control"
              name="price"
              type="number"
              onChange={handleChange}
              value={state.form.price}
            />
          </FormGroup>

          <FormGroup>
            <label>Imagen url:</label>
            <input
              className="form-control"
              name="image_url"
              type="text"
              onChange={handleChange}
              value={state.form.image_url}
            />
          </FormGroup>

          <label>
            Categoria:
            <FormSelect
              className="form-control"
              name="category_id"
              defaultValue={state.form.category_id}
              typeof="number"
              onChange={handleChange}
            >
              {state.productsCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </FormSelect>
          </label>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => edit(state.form)}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => dispatch({ type: "cancelModalUpdate" })}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalProductEdit;
