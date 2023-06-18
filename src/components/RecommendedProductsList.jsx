import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../hooks/useApp";
import { Product } from "./Product";

export function RecommendedProductsList() {
  const { products } = useAppSelector((state) => state.products);
  return (
    <Container>
      <Row>
        {products?.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className='mb-3'>
            <Product product={product} isWhishList={false} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
