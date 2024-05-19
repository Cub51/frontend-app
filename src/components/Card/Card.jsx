import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useContext } from 'react';
import CursoContext from '../../context/Curso/CursoContext';

import styles from '../styles.module.scss';

const BasicCardCursos = (cursos) => {
  const {
    cursos_usuario,
    loading,
    error,
    getCurso,
    matricularseCurso,
    } = useContext(CursoContext);


  return (
      <div className={styles.container_general}>
 
        <p>Cursos</p>
        <div className={styles.card_container}>
          {
            cursos ? (
              cursos && cursos.map(curso => (
                <Card key={curso._id} style={{ width: '18rem' }} >
                  <Card.Img variant="top" src="/vite.svg" />
                  <Card.Body>
                    <Card.Title>{curso.nombreCurso}  </Card.Title>
                    <Card.Text>
                      {curso.cursoDescripcion}
                    </Card.Text>
                    <Button variant="primary"  onClick={() => { getCurso(curso._id); matricularseCurso(curso._id); }}>Entrar al Curso</Button>
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

export default BasicCardCursos;