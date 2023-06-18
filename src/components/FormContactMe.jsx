import { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const formTexts = {
  title: "how can we help?",
  subtitle:
    "Complete the form below, select a subject, type your question or comment and we will get back to you as soon as possible",
  firstName: {
    label: "firt name",
    error: "please enter first name",
  },
  lastName: {
    label: "last name",
    error: "please enter last name",
  },
  email: {
    label: "email",
    error: "please enter e-mail",
  },
  subject: {
    label: "subject",
    error: "please enter a subject",
    options: [
      {
        text: "Please select a topic",
        value: "",
      },
      {
        text: "Online Store Purchase",
        value: "OnlineStorePurchase",
      },
      {
        text: "Retail Store Purchase",
        value: "RetailStorePurchase",
      },
      {
        text: "Shipping",
        value: "Shipping",
      },
      {
        text: "Payments",
        value: "Payments",
      },
      {
        text: "Returns and Refunds",
        value: "ReturnsAndRefunds",
      },
      {
        text: "Product Information",
        value: "ProductInformation",
      },
      {
        text: "Sizes",
        value: "Sizes",
      },
      {
        text: "Technical Help",
        value: "TechnicalHelp",
      },
      {
        text: "Point of sales",
        value: "PointOfSales",
      },
    ],
  },
  message: {
    label: "message",
    error: "please enter a message",
  },
  privacy: {
    label: "privacy consent",
    error: "you must agree before submitting",
  },
  submitButton: {
    label: "submit",
  },
};

const toastTexts = {
  sendMessage: {
    text: "Success! Message sent",
    icon: "📨",
  },
};

export function FormContactMe() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [validated, setValidated] = useState(false);

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubject(e) {
    setSubject(e.target.value);
  }

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function handlePrivacy() {
    setPrivacy((privacy) => !privacy);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (!firstName || !lastName || !email || !subject || !message || !privacy) {
      return;
    }

    const messageFromUser = {
      name: `${firstName} ${lastName}`,
      email,
      subject,
      message,
    };
    console.log(JSON.stringify(messageFromUser));
    toast.success(`${toastTexts.sendMessage.text}`, {
      position: toast.POSITION.TOP_RIGHT,
      icon: toastTexts.sendMessage.icon,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setPrivacy(false);
    setValidated(false);
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
        <Row className='mb-4'>
          <Col sm={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor='first-name' className='form-label-required'>
                {formTexts.firstName.label}
              </Form.Label>
              <Form.Control
                id='first-name'
                type='text'
                value={firstName}
                required
                onChange={handleFirstName}
              />
              <Form.Control.Feedback type='invalid'>
                <span>{formTexts.firstName.error}</span>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor='last-name' className='form-label-required'>
                {formTexts.lastName.label}
              </Form.Label>
              <Form.Control
                id='last-name'
                type='text'
                value={lastName}
                required
                onChange={handleLastName}
              />
              <Form.Control.Feedback type='invalid'>
                {formTexts.lastName.error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-4'>
          <Col sm={12} md={6} className='mb-2'>
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

          <Col sm={12} md={6}>
            <Form.Group className='mt-2'>
              <Form.Label htmlFor='subject' className='form-label-required'>
                {formTexts.subject.label}
              </Form.Label>
              <Form.Select value={subject} required onChange={handleSubject}>
                {formTexts.subject.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {formTexts.subject.error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-4'>
          <Col xs={12}>
            <Form.Group>
              <Form.Label htmlFor='message' className='form-label-required'>
                {formTexts.message.label}
              </Form.Label>
              <Form.Control
                id='message'
                as='textarea'
                value={message}
                rows={10}
                cols={20}
                maxLength={100}
                required
                onChange={handleMessage}
              />
              <Form.Control.Feedback type='invalid'>
                {formTexts.message.error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col xs={12}>
            <Form.Group>
              <Form.Check
                id='privacy-consent'
                label={formTexts.privacy.label}
                value={privacy}
                checked={privacy}
                feedback={formTexts.privacy.error}
                feedbackType='invalid'
                required
                className='form-label-required'
                onChange={handlePrivacy}
              />
            </Form.Group>
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
