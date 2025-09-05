import { Container, Row, Col, Card, Form, Button, Placeholder, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import CursoContext from '../../context/Curso/CursoContext';
import { useNavigate } from 'react-router-dom';

import styles from '../styles.module.scss';

const BasicCardCursos = (cursos) => {

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombreCurso: "",
    cursoDescripcion: "",
    fechaInicio: "",
    fechaFin: "",
    _id: "",
  });
  const {
    cursos_usuario,
    loading,
    error,
    getCurso,
    getCursos,
    matricularseCurso,
    deleteCurso,
    updateCurso,
  } = useContext(CursoContext);

  const handleDeleteUser = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      deleteCurso(id);
      getCursos();
    }
  };

  const handleShowModal = (_id) => {

    setFormData({
      nombreCurso: "",
      cursoDescripcion: "",
      fechaInicio: "",
      fechaFin: "",
      _id: _id,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {console.log("save ", formData);
    updateCurso(formData);
    setShowAlert(true);
    setFormData({   nombreCurso: "",
      cursoDescripcion: "",
      fechaInicio: "",
      fechaFin: "", _id: "" });
    handleCloseModal();
  };
  const userRole = localStorage.getItem("rol");

  useEffect(() => {
    getCursos();
    setShowAlert(false);
}, [setShowAlert]);

  return (
    <div className={styles.container_generaal}>
      <div className={styles.card_container}>
        {
          cursos?.map(curso => (
            <Card key={curso._id} style={{ maxWidth: '18rem' }} className="justify-content-left" >
              <Card.Img variant="top" src="/curso.jpg" />
              <Card.Body>
                <Card.Title> <strong>{curso.nombreCurso}</strong>  </Card.Title>
                <Card.Text>
                  {curso.cursoDescripcion}
                </Card.Text>
                {userRole === 'Estudiante' ? (
                  <Button variant="secondary" className="me-2" onClick={() => { getCurso(curso._id); matricularseCurso(curso._id); }}>Entrar al Curso</Button>
                ) : userRole === 'Administrador' ? (
                  <Button className="me-2"
                    variant="secondary"
                    onClick={async () => {
                      await getCurso(curso._id)
                      localStorage.setItem('curso_id', curso._id);
                      navigate('/coursesDetalle');
                    }}
                  >
                    Ver detalle
                  </Button>
                ): (<div></div>)}
                <br />
                {userRole === 'Administrador' ? (

                  <div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleShowModal(curso._id), setShowAlert(true);
                      }}
                      className="me-2"
                    >
                      Actualizar
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDeleteUser(curso._id);

                      }}
                      className="me-2"
                    >
                      Borrar
                    </Button>
                  </div>

                ) : (
                  <h2></h2>
                )}
              </Card.Body>
            </Card>
          )) || (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                  <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
              </Card.Body>
            </Card>
          )
        }

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombreCurso">
                <Form.Label>Nombre del Curso</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreCurso"
                  value={formData.nombreCurso}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="cursoDescripcion"
                  value={formData.cursoDescripcion}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formFechaInicio" className="mt-3">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formFechaFin" className="mt-3">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleSave() , showAlert &&
                (mostrarAlerta(
                    "Curso actualizado correctamente.",
                    "alert-success"
                ),
                    setShowAlert(false));

              }}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
}

function mostrarAlerta(mensaje, tipo) {
  // Crea un div con la clase "alert" y el tipo "info" de Bootstrap
  const alerta = document.createElement("div");
  alerta.classList.add(
      "alert",
      tipo,
      "position-fixed",
      "top-0",
      "end-0",
      "mt-5"
  );
  alerta.setAttribute("role", "alert");
  alerta.textContent = mensaje;
  document.body.appendChild(alerta);

  setTimeout(() => {
      document.body.removeChild(alerta);
  }, 3000);
}

export default BasicCardCursos;