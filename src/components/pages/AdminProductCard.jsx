import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/AdminProductCard.module.css";
import { useContextGlobal } from "../../context/Context";

const ellipsis = (text) => {
  if (text.length > 200) {
    text = text.slice(0, 200) + "...";
  }
  return text;
};

const AdminProductCard = (props) => {
  const { dispatch } = useContextGlobal();

  return (
    <Card className={styles.productCard}>
      <Card.Img
        className={styles.cardImage}
        variant="top"
        src={`https://fly-mountain-app.s3.us-east-2.amazonaws.com/images/product${props.product.id}.jpg`}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title>${props.product.price}</Card.Title>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>{ellipsis(props.product.description)}</Card.Text>
        <div className={styles.options}>
          <Link
            className={styles.deleteIcon}
            onClick={() =>
              dispatch({ type: "removeProduct", payload: props.product.id })
            }
          >
            <i className="bi bi-trash"></i>
          </Link>
          <Link className={styles.editIcon}>
            <i className="bi bi-pencil"></i>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminProductCard;
