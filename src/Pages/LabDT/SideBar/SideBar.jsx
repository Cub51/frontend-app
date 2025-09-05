import React, { useState, useEffect, useContext } from 'react';
import { Offcanvas, Button, Form, ListGroup } from 'react-bootstrap';
import PracticaContext from '../../../context/Practica/PracticaContext';
var actividades = [];
var titulo = '';
var comentario = '';
var calificacion = 0;
var objetivos = [];
var practicaEstadoId = '';

const handleTraerdeBDEstado = () => {
  { console.log("PPPPPP", localStorage.getItem('practica_estado')); }
  if (localStorage.getItem('practica_estado') !== null) {
    const PracticaEstado = JSON.parse(localStorage.getItem('practica_estado'));

    //const id = JSON.parse(localStorage.getItem("usuario"))._id;

    // titulo objetivos actividades
    console.log('datos practica ESTUDIANTE', PracticaEstado);
    comentario = PracticaEstado.comentario;
    calificacion = PracticaEstado.calificacion;
    actividades = PracticaEstado.practicaAsignada.actividad;
    objetivos = PracticaEstado.practicaAsignada.objetivo;
    titulo = PracticaEstado.practicaAsignada.titulo;
    practicaEstadoId = PracticaEstado._id;
    if (PracticaEstado.estado !== null) {
      // NO INTERVIENE EL STATE
    }
  } else {
    //no hacer nada
  }
};

const ActivityList = () => {

  const [checked, setChecked] = useState({});

  const handleToggle = (index) => {
    setChecked(prevState => ({ ...prevState, [index]: !prevState[index] }));
  };

  return (
    <Form>
      <ListGroup>
        {actividades.map((activity, index) => (
          <ListGroup.Item key={index}>
            <Form.Check
              inline
              label={activity}
              checked={!!checked[index]}
              onChange={() => handleToggle(index)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Form>
  );
};

const ObjectivoList = () => {
  const [checked, setChecked] = useState({});
  const handleToggle = (index) => {
    setChecked(prevState => ({ ...prevState, [index]: !prevState[index] }));
  };

  return (
    <Form>
      <ListGroup>
        {objetivos.map((activity, index) => (
          <ListGroup.Item key={index}>
            <Form.Check
              inline
              label={activity}
              checked={!!checked[index]}
              onChange={() => handleToggle(index)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Form>
  );
};

const CalificacionComentario = () => {
  const {
    practicas,
    practicas_user,
    practicas_course,
    practicas_course_estudiante,
    practicas_user_teacher,
    practica,
    loading,
    error,
    getPracticas,
    getPracticasByCurso,
    getPractica,
    addPractica,
    updatePractica,
    deletePractica,
    clearPractica,
    setLoading,
    getPracticasByEstudiante,
    getPracticasByProfesor,
    getPracticasEstadoByCurso,
    updateCalificacionPractica,
    updateComentarioPractica,
  } = useContext(PracticaContext);

  const [calificacionn, setCalificacion] = useState('');
  const [comentarios, setComentario] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  const handleGradeChange = (value) => {
    if (/^\d*$/.test(value)) { // solo numeros
      setCalificacion(value);
    }
  };

  const handleCommentChange = (value) => {
    setComentario(value);
  };

  const handleSave = () => {
    console.log(`Calificación: ${calificacionn}`);
    console.log(`Comentario: ${comentarios}`);
    // Guarda la calificación y el comentario en el backend o en el estado según sea necesario
  };
  { if(JSON.parse(localStorage.getItem("usuario")).rol !== "Estudiante"){
  return (
    <Form>
    
      <Form.Group controlId="formPracticaCalificacion">
        <Form.Label>Calificación</Form.Label>
        <Form.Control
          type="text"
          name='calificacionn'
          value={calificacionn}
          placeholder="Ingrese calificación"
          onChange={(e) => handleGradeChange(e.target.value)}
          required

        />
      </Form.Group>
      <Form.Group controlId="formPracticaComentario">
        <Form.Label>Comentario</Form.Label>
        <Form.Control
          type="text"
          name='comentarios'
          value={comentarios}
          placeholder="Ingrese comentario"
          onChange={(e) => handleCommentChange(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" onClick={() => {
        { console.log("PPPPPP", practicaEstadoId, " ", calificacionn); }


        handleSave()
        {
          if ((calificacionn !== '') && comentarios !== '') {

            updateCalificacionPractica(practicaEstadoId, calificacionn);
            updateComentarioPractica(practicaEstadoId, comentarios);
            setSuccessMessage('Datos actualizados correctamente');
            setFieldsDisabled(true);
            setTimeout(() => {
              setSuccessMessage('');
              // setFieldsDisabled(false);
            }, 2000);
          }else {
            setFieldsDisabled(false);
          }
        }
      }}>
        Guardar
      </Button>
      {/* if comentario y nota es diferente de '' presentar de la bd */}
      {fieldsDisabled && (
        <div>
          <strong>Calificación final: {calificacionn}</strong>
          <br />
          <strong>Comentario: {comentarios}</strong>
        </div>
      )}
  
    </Form>
  );
}else{
  return (
    <Form>
      {/* if comentario y nota es diferente de '' presentar de la bd */}
      {(
        <div style={{ textAlign: 'center'} }>
           <br />
         
         Calificación final: <strong style={{ fontSize: '5rem'}} >  <br />{calificacion}</strong>
          <br /> <br />
          Comentario:  <strong> <br />{comentario}</strong>
        </div>
      )}
  
    </Form>
  );
}
}

};

const RightOffcanvas = () => {

  useEffect(() => {
    handleTraerdeBDEstado();
  }, []); // <-- empty dependency array means it will only run once on mount

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
          <Offcanvas.Title>Práctica de Dibujo Técnico , {titulo} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Offcanvas.Header >
            <Offcanvas.Title>Objetivos a realizar , {titulo} </Offcanvas.Title>
          </Offcanvas.Header>
          <ObjectivoList />
          <Offcanvas.Header >
            <Offcanvas.Title>Actividades a realizar , {titulo} </Offcanvas.Title>
          </Offcanvas.Header>
          <ActivityList />
          <CalificacionComentario />

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default RightOffcanvas;