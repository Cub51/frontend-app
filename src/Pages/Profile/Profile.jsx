// Desc: Profile page for the user
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
//import { useNavigate, useHistory } from "react-router-dom"; // Add useHistory import
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ProfileContext from '../../context/Profile/ProfileContext';

import styles from '../../components/styles.module.scss';
const Profile = () => {
  //const history = useHistory();
  const { profile, nombre, apellido, correo, estado, getProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [prof, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
    setLoading(false);
  }, []);


  return (
    <div className={styles.container_general}>
      <Container>
        <Row>
          <Col md={4}>
            <Card style={{ width: '18rem' , marginTop: '50px'}}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Perfil de Usuario</Card.Title>
                <Card.Text style={{ alignContent: 'baseline'}}  > 
                  {profile ? (
                    <>
                     <span>Cod: {profile._id}</span>
                      <p>Asistencia: {(profile.asistencia.length == 0) ? (<span> No hay asistencias</span>) : (<span>{profile.asistencia} </span>)}</p>
                     
                     <Col> 
                     <span> {nombre} - {apellido} </span>
                     </Col>
                    
                      <span> Correo: {correo} </span>
                      <span> Estado: {estado} </span>
                      {/* Add more fields as needed */}
                    </>
                  ) : (
                    <span>No data available</span>
                  )}

                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;