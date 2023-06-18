import { Card } from "react-bootstrap";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useWhishListActions } from "../hooks/useWhishListActions";
import { ButtonList } from "./ButtonList";

const productTexts = {
  priceSimbol: "€",
  buttonAddProduct: "add to whish list",
  buttonRemoveProduct: "remove from whish list",
};

export function Product({ product, isWhishList }) {
  const { title, images, price } = product;

  const { addToWhishList, removeFromWhisList } = useWhishListActions();

  function handleAddProduct(product) {
    addToWhishList(product);
  }

  function handleRemoveProduct(id) {
    removeFromWhisList(id);
  }

  return (
    <Card>
      <Card.Img variant='top' src={images[0]} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <span className='price'>
            {productTexts.priceSimbol} {price}
          </span>
        </Card.Text>
        {isWhishList && (
          <ButtonList
            text={productTexts.buttonRemoveProduct}
            callback={() => handleRemoveProduct(product.id)}
            icon={<FaHeartBroken />}
            variant='outline-danger'
          />
        )}
        {!isWhishList && (
          <ButtonList
            text={productTexts.buttonAddProduct}
            callback={() => handleAddProduct(product)}
            icon={<FaHeart />}
            variant='outline-dark'
          />
        )}
      </Card.Body>
    </Card>
  );
}
