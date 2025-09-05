//PRESENTAR INFORMACION Y NO SOLO ID


import styles from '../../../components/styles.module.scss';
import { Container, Row, Col, Card, Form, Button, Placeholder, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import CursoContext from '../../../context/Curso/CursoContext';
import { useNavigate, useParams } from 'react-router-dom';

const MyCourses = () => {
  const navigate = useNavigate();
  const {
    cursos_usuario,
    curso,
    loading,
    error,
    getCurso,
    getCursosTeacher,
    addCurso,
    listarCursosMatriculados } = useContext(CursoContext);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombreCurso: "",
    cursoDescripcion: "",
    fechaInicio: "",
    fechaFin: "",
    responsable: JSON.parse(localStorage.getItem("usuario"))._id,
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showAlert, setShowAlert] = useState(true);

  const handleSave = () => {
    console.log("FORM ", formData.responsable);
    addCurso(formData);
    getCursosTeacher();
    setFormData({
      nombreCurso: "",
      cursoDescripcion: "",
      fechaInicio: "",
      fechaFin: "",
      responsable: JSON.parse(localStorage.getItem("usuario"))._id,
    });
    handleCloseModal();
    setShowAlert(true);
  };
  useEffect(() => {
    console.log('rol', localStorage.getItem("rol"));
    if (localStorage.getItem("rol") != 'Estudiante') {
      getCursosTeacher();
      setShowAlert(false);
    }
    if (localStorage.getItem("rol") === 'Estudiante') {
      listarCursosMatriculados();
      setShowAlert(false);
    }
  }, [setShowAlert]);
  const userRole = localStorage.getItem("rol");
  return (

    <div >


      {console.log('cursos_usuario', cursos_usuario)}
      <div >

        {// VISTA PROFESOR
          // EL ADMINISTRADOR 
          // EL ADMINISTRADOR PODRA ELIMINAR CURSOS
          localStorage.getItem("rol") != 'Estudiante' ? (
            <div key={1} className={styles.container_generaal}>

              {userRole === 'Profesor' ? (
                <h2 className="my-4">Mis Cursos | Profesor |   </h2>
              ) : userRole === 'Estudiante' ? (
                <h2 className="my-4"> Mis Cursos | Estudiante |</h2>
              ) : userRole === 'Administrador' ? (
                <h2 className="my-4">Mis Cursos | Administrador |</h2>
              ) : (
                <h2 className="my-4">(Not Authorized)</h2>
              )}
              <Container>
                <Row style={{ justifyContent: 'left',   width: '90vw',  maxWidth: '100vw'}}>
                  <Col key={1} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
                    <Card style={{ textAlign: 'center' }}>
                      <Card.Body>
                        <Card.Title >
                          <strong>  Agregar Curso </strong>
                        </Card.Title>
                        <Card.Text>
                          Agrega nuevos cursos con un solo clic.
                        </Card.Text>
                        <Button
                          variant="success"
                          onClick={() => {
                            handleShowModal();
                          }}
                          className="me-2"
                        >
                          + Agregar Curso
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>

              <Container>
                <Row className="justify-content-left">
                  {cursos_usuario &&
                    cursos_usuario.map(cursoE => (
                      <Col key={cursoE._id} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center" >
                        <Card style={{ width: '18rem', height: '100%' }}>
                          <Card.Img variant="top" src="/curso.jpg" />
                          <Card.Body>
                            <strong> Curso Creado </strong>
                            <Card.Title> <strong> Curso:  </strong> {cursoE.nombreCurso} </Card.Title>
                            <Card.Text>
                              {cursoE.cursoDescripcion} <br />
                              <p style={{ fontSize: '10pt' }}>
                                <strong >Fecha de Inicio:</strong> {new Date(cursoE.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              <p style={{ fontSize: '10pt' }}>
                                <strong>Fecha de Fin:</strong> {new Date(cursoE.fechaFin).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              {
                                <div key={cursoE._id}>
                                  <Button
                                    variant="primary"
                                    onClick={async () => {
                                      await getCurso(cursoE._id)
                                      localStorage.setItem('curso_id', cursoE._id);
                                      navigate('/coursesDetalle');
                                    }}
                                  >
                                    Ver detalle de curso
                                  </Button>
                                </div>


                              }
                            </Card.Text>

                          </Card.Body>
                        </Card>
                      </Col>

                    ))}
                </Row>
              </Container>

            </div>
          ) : (
            <div key={1} className={styles.container_curs__list_est}>
             
              {userRole === 'Estudiante' ? (
                <h2 className="my-4"> Mis Cursos | Estudiante |</h2>
              ) : (
                <h2 className="my-4">(Not Authorized)</h2>
              )}
              {cursos_usuario.length === 0 ? (
                <h4 className="my-4"> No tienes cursos para mostrar</h4>
              ) : (
                <Container >
                  <Row className="justify-content-left" >
                    {cursos_usuario && cursos_usuario.map(cursoE => (
                      <Col key={cursoE._id} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center" style={{ justifyContent: 'center' }}>
                        <Card style={{ width: '18rem', height: '100%', textAlign: 'left' }} >
                          <Card.Img variant="top" src="/curso.jpg" />
                          <Card.Body>
                            <strong> Curso Inscrito </strong>
                            <Card.Title> <strong> Curso:  </strong> {cursoE.nombreCurso} </Card.Title>
                            <Card.Text>
                              {cursoE.cursoDescripcion} <br />
                              <strong>Fecha de Inicio:</strong> {new Date(cursoE.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                              <br />
                              <strong>Fecha de Fin:</strong> {new Date(cursoE.fechaFin).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                              <br />
                              {
                                <div key={cursoE._id}>
                                  <Button
                                    variant="primary"
                                    onClick={async () => {
                                      await getCurso(cursoE._id)
                                      localStorage.setItem('curso_id', cursoE._id);
                                      navigate('/coursesDetalle');
                                    }}
                                  >
                                    Ver detalle de curso
                                  </Button>
                                </div>


                              }

                              {console.log('cursoEEE ', curso)

                              }
                            </Card.Text>

                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>

              )}

            </div>
          )
        }

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Curso</Modal.Title>
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
                handleSave()

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



export default MyCourses;