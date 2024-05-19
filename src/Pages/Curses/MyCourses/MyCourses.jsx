//PRESENTAR INFORMACION Y NO SOLO ID


import styles from '../../../components/styles.module.scss';
import { Container, Row, Col, Card, Form, Button, Placeholder } from "react-bootstrap";
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
     listarCursosMatriculados } = useContext(CursoContext);
    
      useEffect(() => {
     listarCursosMatriculados();
    
      }, []);

      return (
        <div className={styles.container_general}>
 
      
        <div className={styles.card_container}>

        {
            cursos_usuario ? (
              cursos_usuario.map(cursoE => (

                <Card key={cursoE._id} style={{ width: '18rem' }} >
                  <Card.Img variant="top" src="/vite.svg" />
                  <Card.Body>
                    <Card.Title>{cursoE.nombreCurso}  </Card.Title>
                    <Card.Text>
                      {cursoE.cursoDescripcion}
                      Curso Matriculado
                   

           {cursoE.userId}
           {cursoE._id}
           {
              cursoE.cursosAsignados.map((cursoAsignado) => (
                <div key={cursoAsignado._id}>
                    {console.log( 'dasa',(cursoAsignado._id))}
                {console.log('cursoAsignado',cursoAsignado)}
                {}
                  {cursoAsignado.nombreCurso}
                  <Button
                    variant="primary"
                    onClick={async() => { 

                        await getCurso(cursoAsignado._id)
                      {console.log('cursoAsignado._id', cursoAsignado._id)}
                      {console.log('curso', curso)}
                     
                        navigate('/coursesDetalle/' + cursoAsignado._id);
                        
                    
                    }}
                
                  >
                    Ver detalle de curso
                  </Button>
                </div>
           ))

           }

            {console.log('cursoEEE ',curso)
            
            }
                    </Card.Text>
                    
                  </Card.Body>
                </Card>



              ))
            ) : (
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
        </div>
     </div>
      );
    }


  
export default MyCourses;