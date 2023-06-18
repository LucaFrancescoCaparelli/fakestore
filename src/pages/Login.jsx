import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppSelector, useAppNavigate } from "../hooks/useApp";
import { FormLogin } from "../components/FormLogin";
import { FormRegister } from "../components/FormRegister";

function ActionButton({ content, buttonText, callback }) {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <span className='me-3 text-uppercase'>{content}</span>
      <Button variant='outline-dark' onClick={callback}>
        {buttonText}
      </Button>
    </div>
  );
}

const loginTexts = {
  login: "already have an account?",
  loginButton: "Login!",
  register: "new user?",
  registerButton: "Register now!",
};

export function Login() {
  const [action, setAction] = useState("login");
  const user = useAppSelector((state) => state.account.user);

  const navigate = useAppNavigate();

  useEffect(() => {
    if (user.token) {
      navigate("/feed");
    }
  }, [navigate, user]);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAction((action) => (action === "login" ? "register" : "login"));
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          {action === "login" ? <FormLogin /> : <FormRegister />}
        </Col>
      </Row>
      <Row className='mt-5 text-center'>
        <Col xs={12}>
          {action === "login" ? (
            <ActionButton
              content={loginTexts.register}
              buttonText={loginTexts.registerButton}
              callback={handleClick}
            />
          ) : (
            <ActionButton
              content={loginTexts.login}
              buttonText={loginTexts.loginButton}
              callback={handleClick}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
