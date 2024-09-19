import React, { useEffect } from "react";
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
  const { state, dispatch, getProductsCategory, updateProduct } =
    useContextGlobal();

  useEffect(() => {
    getProductsCategory();
  }, []);

  console.log("Estado productsCategory");
  console.log(state.productsCategory);

  const handleChange = (e) => {
    dispatch({
      type: "handleChange",
      payload: {
        ...state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangePrice = (e) => {
    dispatch({
      type: "handleChange",
      payload: {
        ...state.form,
        [e.target.name]: parseFloat(e.target.value),
      },
    });
  };

  const handleChangeCategory = (e) => {
    let categories = state.productsCategory;
    let categorySelected = {};
    categories.map((data) => {
      if (data.id == e.target.value) {
        categorySelected = {
          id: data.id,
          name: data.name,
          description: data.description,
        };
      }
    });
    dispatch({
      type: "handleChange",
      payload: {
        ...state.form,
        [e.target.name]: parseInt(e.target.value),
        category: categorySelected,
      },
    });
    console.log("Categoria Seleccionada");
    console.log(categorySelected);
  };

  const edit = (dato) => {
    /*let contador = 0;
        let arreglo = state.products;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].name = dato.name;
        arreglo[contador].description = dato.description;
        arreglo[contador].price = dato.price;
        arreglo[contador].image_url = dato.image_url;
        arreglo[contador].category_id = dato.category_id;
        arreglo[contador].category = dato.category;
      }

      contador++;
    });
    */
    // dispatch({ type: "editModalUpdate", payload: arreglo });
        try {
            let productoEditado = {
                id: dato.id,
                name: dato.name,
                description: dato.description,
                price: dato.price,
                category_id: dato.category_id,
                category: dato.category,
            };
            // Enviar solo el producto editado
            updateProduct(productoEditado).then(() => {
                // Actualizar el estado local solo con el producto modificado
                const updatedProducts = state.products.map((product) =>
                    product.id === productoEditado.id ? productoEditado : product
                );

                dispatch({ type: "updateProducts", payload: updatedProducts });

                console.log("Producto editado:");
                console.log(productoEditado);
            });
            console.log("Estado del Form después de ser modificado");
            console.log(state.form);

            console.log("Estado de Products con las modificaciones");
            console.log(state.products);

        } catch (error) {
            console.error(error);
            
        }
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
              type="number "
              onChange={handleChangePrice}
              value={state.form.price}
            />
          </FormGroup>

          {/*<FormGroup>
            <label>Imagen url:</label>
            <input
              className="form-control"
              name="image_url"
              type="text"
              onChange={handleChange}
              value={state.form.image_url}
            />
          </FormGroup>*/}

          <label>
            Categoria:
            <FormSelect
              className="form-control"
              name="category_id"
              defaultValue={state.form.category_id}
              type="number"
              onChange={handleChangeCategory}
            >
              {state.productsCategory.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
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
