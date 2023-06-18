import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

export function Skeleton() {
  return (
    <Card>
      <Placeholder
        xs={6}
        animation='glow'
        style={{ width: "100%", height: "150px", backgroundColor: "#808080" }}
      />
      <Card.Body className='card-body-skeleton'>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation='glow'>
          <span>
            <Placeholder xs={12} />
          </span>
        </Placeholder>
        <Placeholder.Button variant='primary' xs={6} />
      </Card.Body>
    </Card>
  );
}
