import { Alert } from "react-bootstrap";

export function ErrorMessage({ message }) {
  return (
    <Alert variant='danger'>
      <div className='text-center text-uppercase'>
        <span>{message}</span>
      </div>
    </Alert>
  );
}
