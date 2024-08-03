import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ellipsis = (text) => {
  if (text.length > 200) {
    text = text.slice(0, 200) + "...";
  }
  return text;
};
const AdminProductCard = (props) => {
  return (
    <Card className="product-card">
      <Card.Img
        className="card-image"
        variant="top"
        src={props.product.image}
      />
      <Card.Body className="card-body">
        <Card.Title>${props.product.price}</Card.Title>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>{ellipsis(props.product.description)}</Card.Text>
        <div className="options">
          <Link className="delete-icon">
            <i className="bi bi-trash"></i>
          </Link>
          <Link className="edit-icon">
            <i className="bi bi-pencil"></i>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminProductCard;
