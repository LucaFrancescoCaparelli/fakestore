import { Col, Container, Row } from "react-bootstrap";
import { Skeleton } from "./Skeleton";

export function SkeletonsContainer() {
  return (
    <Container className='d-flex justify-content-center'>
      <Row className='row-gap-3'>
        {Array.from({ length: 6 }, (_, i) => (
          <Col key={i} sm={12} md={6} lg={4}>
            <Skeleton />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
