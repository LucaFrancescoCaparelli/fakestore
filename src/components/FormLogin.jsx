import { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { useUserActions } from "../hooks/useUserActions";
import { useAppNavigate } from "../hooks/useApp";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { LOGIN_URL, GET_PROFILE_URL } from "../utils";

const formTexts = {
  title: "log in",
  subtitle: "Log in if already registered",
  email: {
    label: "email",
    error: "please enter your email address",
  },
  password: {
    label: "password",
    error: "please enter your password",
  },
  submitButton: "login",
  errorCredentials:
    "sorry, this does not match our reacords. check you spelling and try agan",
  errorToken: "Something went wrong when login try again, please",
  errorInternetConecction: "Something went wrong when login try again, please",
};

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useAppNavigate();

  const { logInUser } = useUserActions();

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (!email || !password) {
      return;
    }

    try {
      setError("");
      setLoading(true);
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(formTexts.errorCredentials);
      }

      const data = await response.json();

      const user = await fetch(GET_PROFILE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (!user.ok) {
        throw new Error(formTexts.errorToken);
      }

      const userData = await user.json();
      setEmail("");
      setPassword("");
      setValidated(false);
      logInUser({ user: userData, token: data.access_token });
      navigate("/feed");
    } catch (error) {
      console.log(error);
      if (error.message.toLowerCase() === "failed to fetch") {
        setError(formTexts.errorInternetConecction);
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h2 className='text-uppercase text-center my-5'>{formTexts.title}</h2>
        </Col>
      </Row>
      <Row className='text-center mb-3'>
        <Col xs={12}>
          <p>{formTexts.subtitle}</p>
        </Col>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-4 justify-content-center'>
          <Col xs={6}>
            <Form.Group>
              <Form.Label htmlFor='email' className='form-label-required'>
                {formTexts.email.label}
              </Form.Label>
              <Form.Control
                id='email'
                type='email'
                value={email}
                required
                onChange={handleEmail}
              />
              <Form.Control.Feedback type='invalid'>
                {formTexts.email.error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-4 justify-content-center'>
          <Col xs={6}>
            <Form.Group>
              <Form.Label htmlFor='password' className='form-label-required'>
                {formTexts.password.label}
              </Form.Label>
              <Form.Control
                id='password'
                type='password'
                value={password}
                required
                onChange={handlePassword}
              />
              <Form.Control.Feedback type='invalid'>
                {formTexts.password.error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-4 text-center'>
          <Col xs={12}>
            <Button type='submit' variant='outline-success'>
              {isLoading ? <Loader /> : <>{formTexts.submitButton}</>}
            </Button>
          </Col>
        </Row>

        {error && (
          <Row className='my-4'>
            <Col xs={12}>
              <ErrorMessage message={error} />
            </Col>
          </Row>
        )}
      </Form>
    </Container>
  );
}
