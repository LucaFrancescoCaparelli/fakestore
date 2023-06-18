import { useAppSelector } from "../hooks/useApp";
import { ProductsList } from "../components/ProductsList";
import { Col, Row } from "react-bootstrap";
import { RecommendedProductsList } from "../components/RecommendedProductsList";

const pageTexts = {
  title: "whish list",

  subtitle:
    "Here you will find all the products that have been added to your wish list",
  noProducts: "there are no products on the list",
  recommendedProdcuts: "check this products",
};

export function WhishList() {
  const { products } = useAppSelector((state) => state.whishList);

  return (
    <>
      <h2 className='text-uppercase text-center my-5'>{pageTexts.title}</h2>
      <Row className='text-center mb-3'>
        <Col xs={12}>
          <p>{pageTexts.subtitle}</p>
        </Col>
      </Row>
      {products.length ? (
        <ProductsList products={products} isWhishList={true} />
      ) : (
        <p className='text-uppercase fw-bolder text-center'>
          {pageTexts.noProducts}
        </p>
      )}
      <h3 className='text-uppercase text-center my-5'>
        {pageTexts.recommendedProdcuts}
      </h3>
      <RecommendedProductsList />
    </>
  );
}
