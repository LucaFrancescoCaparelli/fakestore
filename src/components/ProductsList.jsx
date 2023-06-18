import { Col, Container, Row } from "react-bootstrap";
import { Product } from "./Product";

export function ProductsList({ products, isWhishList }) {
  return (
    <Container>
      <Row>
        {products?.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className='mb-3'>
            <Product product={product} isWhishList={isWhishList} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
