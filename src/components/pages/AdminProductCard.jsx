import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/AdminProductCard.module.css";

const ellipsis = (text) => {
  if (text.length > 200) {
    text = text.slice(0, 200) + "...";
  }
  return text;
};
const AdminProductCard = (props) => {
  return (
    <Card className={styles.productCard}>
      <Card.Img
        className={styles.cardImage}
        variant="top"
        src={props.product.image}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title>${props.product.price}</Card.Title>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>{ellipsis(props.product.description)}</Card.Text>
        <div className={styles.options}>
          <Link className={styles.deleteIcon}>
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
