import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaUser, FaBookOpen, FaCalendarAlt, FaBell } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  // Simulando datos para el perfil, cursos y asignaciones
  const perfil = { nombre: 'Juan Pérez', email: 'juan.perez@example.com' };
  const cursos = [
    { nombre: 'Matemáticas', descripcion: 'Introducción a la matemática básica.' },
    { nombre: 'Física', descripcion: 'Fundamentos de la física moderna.' },
  ];
  const asignaciones = [
    { nombre: 'Tarea  1', descripcion: 'Resolución de ecuaciones cuadráticas.' },
    { nombre: 'Examen  2', descripcion: 'Evaluación del semestre.' },
  ];

  return (
    <div className="container mt-5">
      <Row className="mb-4">
        <Col>
          <Card style={{ backgroundColor: '#6088ff' }}>
            <Card.Body>
              <Card.Title className="text-white">Perfil</Card.Title>
              <Card.Text className="text-white">{perfil.nombre}</Card.Text>
              <Card.Text className="text-white">{perfil.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        {cursos.map((curso, index) => (
          <Col sm={6} key={index}>
            <Card style={{ backgroundColor: '#6088ff' }}>
              <Card.Body>
                <Card.Title className="text-white">{curso.nombre}</Card.Title>
                <Card.Text className="text-white">{curso.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mb-4">
        <Col>
          <Card style={{ backgroundColor: '#6088ff' }}>
            <Card.Body>
              <Card.Title className="text-white">Asignaciones</Card.Title>
              {asignaciones.map((asignacion, index) => (
                <Card key={index} className="mb-3" style={{ backgroundColor: '#eaeaea' }}>
                  <Card.Body>
                    <Card.Title>{asignacion.nombre}</Card.Title>
                    <Card.Text>{asignacion.descripcion}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card style={{ backgroundColor: '#6088ff' }}>
            <Card.Body>
              <Card.Title className="text-white">Notificaciones</Card.Title>
              <Button variant="primary">
                <FaBell /> Notificación  1
              </Button>
              <Button variant="primary" className="ml-2">
                <FaBell /> Notificación  2
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;


/*

import React from 'react';
import { FaHeart } from 'react-icons/fa';


function App() {
  return (
   <div className=" m-5">
      <div  style={{marginTop: '100px'}}>

</div>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          {/*Perfil del usuario* /}
          <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">John Doe</h5>
              <p className="card-text">Student ID: 123456</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/*Cursos* /}
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Physics 101</h5>
                  <p className="card-text">Introduction to classical mechanics</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Chemistry 101</h5>
                  <p className="card-text">The central science of matter</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Biology 101</h5>
                  <p className="card-text">Fundamentals of life sciences</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Mathematics 101</h5>
                  <p className="card-text">The language of numbers and shapes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FaHeart className="fas fa-heart fa-2x text-danger mt-3"></FaHeart>
          <i className="fas fa-heart fa-3x text-danger mt-3"></i>
          <i className="fas fa-heart fa-4x text-danger mt-3"></i>
        </div>
      </div>
    </div>

   </div>
    
  );
}

export default App;*/