import React, { useState } from 'react';
import { Offcanvas, Button, Form, ListGroup } from 'react-bootstrap';

const ActivityList = () => {
  const activities = [
    { id:   1, title: 'Actividad   1 Determinar el punto de vista y trazar la Línea de Horizonte:', completed: false },
    { id:   2, title: 'Actividad   2 Trazar las líneas de fuga', completed: false },
    { id:   3, title: 'Actividad   3 Dibujar el contorno de la figura', completed: false },
    { id:   4, title: 'Actividad   4 Añadir detalles y sombras', completed: false },
    { id:   5, title: 'Actividad   5 Revisar y ajustar', completed: false },
  ];

  const [checked, setChecked] = useState({});

  const handleToggle = (id) => {
    setChecked(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <Form>
    <ListGroup>
      {activities.map(activity => (
        <ListGroup.Item key={activity.id}>
          <Form.Check
            inline
            label={activity.title}
            checked={!!checked[activity.id]}
            onChange={() => handleToggle(activity.id)}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Form>
  );
};

const RightOffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Actividades a realizar
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="bg-white" // Estilo para el fondo blanco
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Práctica de Dibujo Técnico </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ActivityList />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default RightOffcanvas;