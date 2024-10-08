import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/AdminProductCard.module.css";
import { useContextGlobal } from "../../context/Context";
import ModalProductEdit from "../common/ModalProductEdit";

const ellipsis = (text) => {
  if (text.length > 200) {
    text = text.slice(0, 200) + "...";
  }
  return text;
};

const AdminProductCard = (props) => {
  const { dispatch, removeProduct } = useContextGlobal();

  return (
    <Card className={styles.productCard}>
      <Card.Img
        className={styles.cardImage}
        variant="top"
        src={`https://fly-mountain-app.s3.us-east-2.amazonaws.com/${props.product.imageKey}`}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title>${props.product.price}</Card.Title>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>{ellipsis(props.product.description)}</Card.Text>
        <div className={styles.options}>
          <Link
            className={styles.deleteIcon}
            onClick={() => removeProduct(props.product.id)}
          >
            <i className="bi bi-trash"></i>
          </Link>
          <Link
            className={styles.editIcon}
            onClick={() =>
              dispatch({ type: "showModalUpdate", payload: props.product })
            }
          >
            <i className="bi bi-pencil"></i>
          </Link>
        </div>
      </Card.Body>
      <ModalProductEdit />
    </Card>
  );
};

export default AdminProductCard;
