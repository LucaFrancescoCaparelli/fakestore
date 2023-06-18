import { Button } from "react-bootstrap";

export function ButtonList({ text, icon, variant, callback }) {
  return (
    <Button variant={variant} onClick={callback}>
      <div className='d-flex align-items-center'>
        <span className='text-uppercase me-2'>{text}</span>
        {icon}
      </div>
    </Button>
  );
}
