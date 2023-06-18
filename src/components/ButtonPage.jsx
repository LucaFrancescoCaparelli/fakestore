import { Button } from "react-bootstrap";

export function ButtonPage({
  content,
  icon,
  disabled,
  callback,
  position = "right",
}) {
  return (
    <Button
      className='mx-2'
      disabled={disabled}
      onClick={callback}
      variant='outline-primary'
    >
      {position !== "right" ? (
        <>
          {icon}
          <span className='ms-2 text-uppercase'>{content}</span>
        </>
      ) : (
        <>
          <span className='me-2 text-uppercase'>{content}</span>
          {icon}
        </>
      )}
    </Button>
  );
}
