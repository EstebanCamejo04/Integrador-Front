import { useEffect, useState } from "react";
import formStyles from "../../styles/LoginForm.module.css";
import styles from "../../styles/CreateProduct.module.css";
import axios from "axios";
import { Form, Spinner } from "react-bootstrap";
import SuccessCreateProduct from "../common/SuccessCreateProduct";
import { API_BASE_URL } from "../../utils/appConstants";

const CreateProduct = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: 0,
    available: false,
  });
  const [loading, setLoading] = useState(false); // Estado para manejar el spinner

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}:3000/api/products_categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the category list:", error);
      });
  }, []);

  const validate = () => {
    const errors = {};
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/avif",
    ];
    if (!productData.name) errors.name = "El campo nombre es obligatorio";
    else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(productData.name)) {
      errors.name = "El nombre no puede incluir números ni símbolos";
    }
    if (!productData.description)
      errors.description = "El campo descripción es obligatorio";
    else if (!/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/.test(productData.description)) {
      errors.description = "La descripción no puede incluir símbolos";
    }
    if (!productData.price) errors.price = "El precio es obligatorio";
    else if (!/^[0-9]+$/.test(productData.price))
      errors.price = "El precio debe ser un numero entero positivo";
    if (!productData.image) errors.image = "La imagen es obligatoria";
    else if (!validImageTypes.includes(productData.image.type)) {
      errors.image =
        "El archivo debe ser una imagen en alguno de estos formatos (.JPEG, .JPG, .PNG, .SVG, .AVIF)";
    }
    if (!productData.category)
      errors.category = "Debes elegir una categoría para el producto";
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      createProduct();
    }
  };

  const updateState = (event) => {
    const { name, value, files, checked } = event.target;

    if (name === "image") {
      setProductData({
        ...productData,
        [name]: files ? files[0] : null,
      });
    } else if (name === "available") {
      setProductData({
        ...productData,
        [name]: checked,
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const createProduct = () => {
    setLoading(true); // Activamos el spinner cuando comienza la solicitud
    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image_url", productData.image);
    formData.append("category_id", productData.category);
    formData.append("available", productData.available);

    axios
      .post(`${API_BASE_URL}:3000/api/products`, formData)
      .then((res) => {
        if (res.status == 201) {
          console.log(res.data);
          setLoading(false); // Cuando finaliza la solicitud, desactivar el spinner
          setShow(true);
        }
      })
      .catch((error) => {
        console.error("Error creating a new product:", error);
        if (
          error.response.data.error ===
          "Product name already exists, try another name."
        ) {
          setLoading(false); // Cuando finaliza la solicitud, desactivar el spinner
          setErrors({ name: "Ya existe un producto con este nombre" });
        }
      });
  };

  return (
    <>
      <SuccessCreateProduct show={show} setShow={setShow} />
      <h2 className={styles.Title}>Registrar producto</h2>
      <div className={formStyles.formContainer}>
        <div className={formStyles.form}>
          <p className={styles.formTitle}>
            Ingresa los datos a continuación para crear un nuevo producto
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <Form.Label>Nombre</Form.Label>
              <input
                type="text"
                name="name"
                placeholder="Escriba el nombre del producto*"
                value={productData.name}
                onChange={updateState}
                className={
                  styles.inputField +
                  " " +
                  (errors.name ? styles.inputError : "")
                }
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formItem}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Escriba una descripción del producto*"
                value={productData.description}
                onChange={updateState}
                className={
                  styles.inputField +
                  " " +
                  (errors.description ? styles.inputError : "")
                }
              />
              {errors.description && (
                <span className={styles.errorText}>{errors.description}</span>
              )}
            </div>

            <div className={styles.formItem}>
              <Form.Label>Precio</Form.Label>
              <input
                type="text"
                name="price"
                placeholder="Escriba el precio del producto*"
                value={productData.price}
                onChange={updateState}
                className={
                  styles.inputField +
                  " " +
                  (errors.price ? styles.inputError : "")
                }
              />
              {errors.price && (
                <span className={styles.errorText}>{errors.price}</span>
              )}
            </div>

            <div className={styles.formItem}>
              <Form.Label>Imagen</Form.Label>
              <input
                type="file"
                name="image"
                placeholder="Imagen*"
                onChange={updateState}
                className={
                  styles.inputField +
                  " " +
                  (errors.image ? styles.inputError : "")
                }
              />
              {errors.image && (
                <span className={styles.errorText}>{errors.image}</span>
              )}
            </div>

            <div className={styles.formItem}>
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                aria-label="Select category"
                name="category"
                value={productData.category}
                onChange={updateState}
                className={
                  styles.inputField +
                  " " +
                  (errors.category ? styles.inputError : "")
                }
              >
                <option hidden value={0}>
                  Seleccionar categoría del producto
                </option>
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
              {errors.category && (
                <span className={styles.errorText}>{errors.category}</span>
              )}
            </div>

            <div className={styles.formCheckItem}>
              <Form.Label>Disponible</Form.Label>
              <Form.Switch
                name="available"
                className={styles.inputCheck}
                id="custom-switch"
                checked={productData.available}
                onChange={updateState}
              ></Form.Switch>
            </div>

            {!loading ? (
              <button type="submit" className={formStyles.button}>
                Crear producto
              </button>
            ) : (
              <div className={styles.loader}>
                <Spinner
                  animation="border"
                  variant="warning"
                  className={styles.spinner}
                />
                <span>Creando producto nuevo...</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
