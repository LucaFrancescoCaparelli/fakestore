import { useState, useRef } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { REGISTER_URL } from "../utils";

const formTexts = {
  title: "new user?",
  subtitle: "Creating an account is easy!",
  description:
    "With a FAKE STORE account you can save and review items in your wishlist.",
  name: {
    label: "name",
    error: "please enter name",
  },
  email: {
    label: "email",
    error: "please enter e-mail",
  },
  password: {
    label: "password",
    requirements:
      "Your password must be minimum 8 characters, contain at least one uppercase, one lowercase and one number",
    error: "please enter a password",
  },
  submitButton: {
    label: "register",
  },
};

const toastTexts = {
  register: {
    text: "Successful registration. Now login!",
    icon: "😎",
  },
};

export function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validCatcha, setValidCaptcha] = useState(false);

  const captchaRef = useRef(null);

  function validatePassword(name) {
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

    if (regex.test(name)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }

  function validateEmail(email) {
    const regex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

    if (regex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  }

  function handleCaptcha(value) {
    if (value) setValidCaptcha(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (
      !name ||
      !email ||
      !password ||
      !isValidEmail ||
      !isValidPassword ||
      !validCatcha
    ) {
      return;
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        }),
      });

      if (!response.ok) {
        throw new Error("err");
      }
      const data = await response.json();

      if (data) {
        toast.success(`${toastTexts.register.text}`, {
          position: toast.POSITION.TOP_RIGHT,
          icon: toastTexts.register.icon,
        });
        setEmail("");
        setName("");

        setPassword("");
        setIsValidPassword(false);
        setTouchedPassword(false);

        setEmail("");
        setIsValidEmail(false);
        setTouchedEmail(false);

        setValidated(false);

        setValidCaptcha(false);

        captchaRef.current.reset();
      }
    } catch (error) {
      console.log(error);
    }
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
        <Col xs={12}>
          <p>{formTexts.description}</p>
        </Col>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-4 justify-content-center'>
          <Col xs={6}>
            <Form.Group>
              <Form.Label htmlFor='name' className='form-label-required'>
                {formTexts.name.label}
              </Form.Label>
              <Form.Control
                id='name'
                type='text'
                value={name}
                required
                onChange={handleName}
              />
              <Form.Control.Feedback type='invalid'>
                <span>{formTexts.name.error}</span>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
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
                isValid={isValidEmail}
                isInvalid={!isValidEmail && touchedEmail}
                onChange={handleEmail}
                onBlur={() => setTouchedEmail(true)}
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
                aria-describedby='passwordHelpBlock'
                isValid={isValidPassword}
                isInvalid={!isValidPassword && touchedPassword}
                onChange={handlePassword}
                onBlur={() => setTouchedPassword(true)}
              />
              <Form.Control.Feedback type='invalid'>
                <span>{formTexts.password.error}</span>
              </Form.Control.Feedback>

              <Form.Text id='passwordHelpBlock' muted>
                {formTexts.password.requirements}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col xs={12}>
            <div style={{ margin: "0 auto", width: "290px" }}>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY}
                ref={captchaRef}
                onChange={handleCaptcha}
              />
            </div>
          </Col>
        </Row>
        <Row className='mt-4 text-center'>
          <Col xs={12}>
            <Button type='submit' variant='outline-success'>
              {formTexts.submitButton.label}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
