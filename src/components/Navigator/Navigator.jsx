// Autor: Jean Agreda

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SideBar from '../SideBar/SideBar';
const NavigatorTop = () => {

  return (
    <>
      <Navbar className="navbar bg-dark border-bottom border-body fixed-top navbar-expand-lg bg-body-tertiary  " data-bs-theme="dark">
        <Container>

        <SideBar />

          <Navbar.Brand href="#NavigatorTop">
            <img src="/vite.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />PDT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Area Personal</Nav.Link>
              <Nav.Link href="/courses/mycourses">Mis Cursos</Nav.Link>
              <Nav.Link href="#link" disabled>Libreria</Nav.Link>
              <NavDropdown title="Configuración" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
             {/**    <NavDropdown.Item href="#action/3.2">
                  Dark Mode
                </NavDropdown.Item>
            
              *    <NavDropdown.Item href="/profile">Actualizar Perfil</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Actualizar Contraseña</NavDropdown.Item>
              */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">
                Cerrar Sesion
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
         {/**
          *  <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          */}
        </Container>
      
      </Navbar>

     
    </>
  );

};

export default NavigatorTop;
