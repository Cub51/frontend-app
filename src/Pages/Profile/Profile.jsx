// Desc: Profile page for the user
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
//import { useNavigate, useHistory } from "react-router-dom"; // Add useHistory import
import { useEffect, useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../context/User/UserContext';
import ProfileContext from '../../context/Profile/ProfileContext';

import styles from '../../components/styles.module.scss';
const Profile = () => {

  //const history = useHistory();
  const { profile, nombre, apellido, correo, estado, getProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [prof, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { users, getUsers, updateUser, deleteUser } = useContext(UserContext);
  const [user, setUser] = useState({ _id: '', contrasena: '' });
  const [formData, setFormData] = useState({ contrasena: '' });
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleShowModal = () => {
    console.log("profile", profile);
    setUser({ _id: profile.userId._id, contrasena: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUser({ ...user, _id: profile.userId._id, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log("usuario",user);
    try {
      
      await updateUser(user);
    
    setShowAlert(true);
    setUser({ _id: '', contrasena: ''});
    setFormData({ contrasena: '' });
    setUser(null);
    
    handleCloseModal();
    // Redirigir al inicio
   
  
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  
  useEffect(() => {
    getProfile();
    setLoading(false);
  }, []);


  return (
    <div className={styles.container_general} >
      <Container>
        <Row className={styles.container_general} >
          <Col md={4} className={styles.container_general} >
            <Card style={{ width: '24rem', height: 'auto' , marginTop: '0px'}}>
              {/**
               * <Card.Img variant="top" src="https://place-hold.it/150"/>
               */}
              <Card.Body>
                <Card.Title style={{ textAlign: 'center'}} > MI PERFIL </Card.Title>
                <Card.Text style={{ alignContent: 'baseline'}}  > 
                  {profile ? (
                    <>
                       <span> <strong> Rol:</strong> {profile.userId.rol} </span><br/>
                      <p>Asistencia: {(profile.asistencia.length == 0) ? (<span> No tienes asistencias</span>) : (<span>{profile.asistencia} </span>)}</p>
                      <p>Cursos: {(profile.cursosAsignados.length == 0) ? (<span> No tienes cursos</span>) : (<span>{profile.cursosAsignados} </span>)}</p>
                      <Col> 
                     <span> <strong> Usuario: </strong> {nombre} {apellido} </span>
                     </Col>
                      <span> <strong> Correo: </strong> {correo} </span> <br/>
                      <span> <strong> Estado:</strong> {estado} </span> <br/>
                      <strong>Fecha de Registro:</strong> {new Date(profile.userId.fechaRegistro).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      <br />
                      <strong>Fecha de Actualización:</strong> {new Date(profile.userId.fechaActualizacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      <br />
                      {/* Add more fields as needed */}
                    </>
                  ) : (
                    <span>No hay datos para el perfil de usuario</span>
                  )}

                </Card.Text>
                <Button variant="secondary" style={{ alignContent: 'baseline' }} onClick={ handleShowModal }>Cambiar contraseña !</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Contraseña </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formContrasena">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="text"
                name="contrasena"
                value={formData.contrasena}
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
          <Button variant="primary" onClick={() => {handleSave(), showAlert && (mostrarAlerta('Contraseña actualizado correctamente.','alert-success'), setShowAlert(false))}}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
}

function mostrarAlerta(mensaje, tipo) {
  // Crea un div con la clase "alert" y el tipo "info" de Bootstrap
  const alerta = document.createElement('div');
  alerta.classList.add('alert', tipo, 'position-fixed', 'top-0', 'end-0', 'mt-5');
  alerta.setAttribute('role', 'alert');
  alerta.textContent = mensaje;
  document.body.appendChild(alerta);

  setTimeout(() => {
    document.body.removeChild(alerta);
  }, 3000);
}


export default Profile;