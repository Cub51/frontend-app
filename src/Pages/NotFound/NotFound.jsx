import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado para el enrutamiento

const PageNotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 py-12 text-center">
      <Row>
        <Col className="d-flex justify-content-center">
          <img
            alt="Page not found"
            src="/placeholder.svg"
            style={{
              aspectRatio: "400/200",
              objectFit: "cover",
              width: "400px",
              height: "200px",
            }}
          />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h1 className="display-4 font-weight-bold">Page not found</h1>
          <p className="text-muted">Sorry, we couldn't find the page you're looking for.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/login">
            <Button variant="outline-primary" className="mr-2">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Sign up</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
