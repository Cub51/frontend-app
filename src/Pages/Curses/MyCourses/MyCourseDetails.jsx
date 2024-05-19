import { Card, ListGroup, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import PracticaContext from '../../../context/Practica/PracticaContext';
import CursoContext from '../../../context/Curso/CursoContext';
import { useParams } from 'react-router-dom';

//import styles from '../../../components/styles.module.scss';



const CursoDetalle = () => {
    // Obtiene el estado de las prácticas
    const { id } = useParams();

    const [objetivos, setObjetivos] = useState(['']);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs, setInputs] = useState({
        titulo: '',
        objetivo: ['',],
        actividad: ['',],
        estado: '',
        cursoId: '',
        createdAt: '',
    });
    /*
        fechaEntrega: '',
        fechaInicio: '',
        fechaFin: '',
        userId: '',
        teacherId: '',
         */

    const { titulo, objetivo, actividad, estado, cursoId, createdAt } = inputs;

    const handleInputChangeAll = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    const handleInputChange = (index, event) => {
        const newObjetivos = [...objetivo];
        newObjetivos[index] = event.target.value;
        //setObjetivos(newObjetivos);
        setInputs({
            ...inputs,
            objetivo: newObjetivos
        });
    };

    const handleAddObjetivo = () => {
        setInputs({
                ...inputs,
                objetivo: [...objetivo, '']
            })
        // setObjetivos([...objetivos, '']);
    };

    const handleRemoveObjetivo = index => {
        //const newObjetivos = [...objetivos];
        //newObjetivos.splice(index, 1);
        //setObjetivos(newObjetivos);
        const newObjetivos = [...objetivo];
        newObjetivos.splice(index, 1);
        setInputs(
            {
                ...inputs,
                objetivo: newObjetivos
            });

    };

    const handleInputChangeActividad = (index, event) => {
        const newActividad = [...actividad];
        newActividad[index] = event.target.value;
        setInputs({
            ...inputs,
            actividad: newActividad
        });
    };

    const handleAddActividad = () => {
        setInputs({
            ...inputs,
            actividad: [...actividad, '']
        });
    };

    const handleRemoveActividad = index => {
        const newActividad = [...actividad];
        newActividad.splice(index, 1);
        setInputs({
            ...inputs,
            actividad: newActividad
        });
    };

    const handleInputChangeEstado = (event) => {
        setInputs({
            ...inputs,
            estado: event.target.value
        });
    };

    const handleInputChangeCursoId_CreatedAt = (cursoIdInput, createdAtInput) => {
        setInputs({
            ...inputs,
            cursoId: cursoIdInput,
            createdAt: createdAtInput,
        });
    };


    const handleSubmint = (event) => {
        event.preventDefault();
        console.log('Objetivos enviados:', objetivo);
        console.log('Inputs enviados:', inputs);
        // LOGICA
        console.log('submit');
        handleClose();
    }







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
    } = useContext(PracticaContext);

    const {
        curso,
        getCurso,
        getCursos,
    } = useContext(CursoContext);

    const cursoIdParams = id;

    useEffect(() => {
        console.log('curso ID detal ', cursoIdParams);

        // Obtiene las prácticas dependiendo del rol del usuario
        console.log('curso item ', curso);

        console.log('curso item2 ', curso);

        if (localStorage.getItem("rol") === 'Estudiante') {

            getPracticasByEstudiante();
        } else if (localStorage.getItem("rol") === 'Profesor') {

            getPracticasByCurso(cursoIdParams);
            

        }
    }
        , []);

    return (
        <>
            <div className="container mt-5 " style={{ backgroundColor: '#6088ff' }}>
                <div style={{ marginTop: '100px' }}>

                </div>
                <div className="text-center">

                    <h2 className="text-2xl font-bold" style={{ color: 'whitesmoke' }}>{curso.nombreCurso}</h2>
                    <p className="text-lg text-red-500" style={{ color: 'darkblue' }}>{curso.cursoDescripcion}</p>
                </div>

                {console.log('App.js', localStorage.getItem("rol"))}
                {
                    localStorage.getItem("rol") === 'Profesor' ? (
                        //VISTA PROFESOR
                        // test creador de practicas id 65d17ec683900a5ef10887de

                        <div className="container mt-5 " style={{ backgroundColor: '#6088ff' }}>
                            <div>
                                {console.log('App.js', localStorage.getItem("rol"))}
                                {
                                    <Button variant='primary' onClick={() => {
                                        mostrarAlerta(`Curso: ${curso.nombreCurso}`)
                                        handleShow();
                                    }}>
                                        Añadir Practica
                                    </Button>
                                }
                            </div>

                            <Card className="mt-4" style={{ backgroundColor: '#6088ff' }}>
                                <Card.Body >
                                    <Card.Title style={{ color: 'whitesmoke' }}>Asignaciones</Card.Title>
                                    {practicas_course.map((practica_user) => (
                                        <Card key={practica_user._id} className="mb-3">
                                            <Card.Body style={{ backgroundColor: '#eaeaea' }}>
                                                <Card.Title style={{ color: 'black' }}>
                                                    {practica_user.titulo}
                                                </Card.Title>
                                                <Card.Text style={{ color: 'gray' }}>

                                                    {practica_user._id}
                                                    {practica_user.curso.nombreCurso}

                                                </Card.Text>
                                            </Card.Body>
                                            <Button variant='primary' onClick={() => {
                                                mostrarAlerta(`Asignación: ${practica_user.titulo}`);
                                                getPracticasEstadoByCurso(cursoIdParams);
                                            }
                                            }>
                                                Ver Asignaciones por Estudiante
                                            </Button>
                                        </Card>
                                    ))}
                                </Card.Body>

                                <Card.Body >
                                    <Card.Title style={{ color: 'whitesmoke' }}>Asignaciones Estudiantes</Card.Title>
                                    {practicas_course_estudiante.map((practica_user_es) => (
                                        <Card key={practica_user_es._id} className="mb-3">
                                            <Card.Body style={{ backgroundColor: '#eaeaea' }}>
                                                <Card.Title style={{ color: 'black' }}>
                                                    {practica_user_es.practicaAsignada.titulo}
                                                </Card.Title>
                                                <Card.Text style={{ color: 'gray' }}>
                                                    Calificación:  :
                                                    {practica_user_es.calificacion}
                                                    <Card.Text style={{ color: 'red' }}>
                                                        {practica_user_es.userId}

                                                    </Card.Text>
                                                    <Card.Text style={{ color: 'red' }}>
                                                        {
                                                            practica_user_es.estado.map((est, index) => (
                                                                <Card.Text key={index} style={{ color: 'blue' }}>
                                                                    {est.type}
                                                                </Card.Text>
                                                            ))
                                                        }


                                                    </Card.Text>
                                                </Card.Text>
                                            </Card.Body>
                                            <Button variant='primary' onClick={() => {
                                                mostrarAlerta(`Asignación: ${practica_user_es.practicaAsignada.titulo}`);
                                            }
                                            }>
                                                Ver Desarrollo
                                            </Button>
                                        </Card>
                                    ))}
                                </Card.Body>
                            </Card>

                            <div className="mt-4">
                                <Card>
                                    <Card.Header>
                                        <h4 className="text-lg font-bold mb-2">Actividades del Año Académico</h4>
                                    </Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Introducción al Desarrollo Web</ListGroup.Item>
                                        <ListGroup.Item>Bases de HTML</ListGroup.Item>
                                        <ListGroup.Item>Estilización con CSS</ListGroup.Item>
                                        <ListGroup.Item>Fundamentos de JavaScript</ListGroup.Item>
                                        <ListGroup.Item>Desarrollo de Proyectos</ListGroup.Item>
                                        <ListGroup.Item>Entrega del Proyecto Final</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </div>

                            <div className="mt-4">

                                <div className=" text-end mt-4" >
                                    <Button variant='primary' onClick={() => mostrarAlertaBootstrap(`Profesor: PEPE`)}>
                                        Info Profesor Encargado
                                    </Button>
                                </div>
                            </div>
                            <div className="container" style={{ margin: '20px' }}>

                            </div>
                        </div>




                    ) :
                        (
                            // VISTA ESTUDIANTE
                            <div className="container mt-5 " style={{ backgroundColor: '#6088ff' }}>
                                <div >
                                    {console.log('App.js', localStorage.getItem("rol"))}
                                    {
                                        (
                                            <Button variant='primary' onClick={() => mostrarAlerta(`Curso: ${curso.nombreCurso}`)}>
                                                Matricularse
                                            </Button>
                                        )
                                    }
                                </div>

                                <Card className="mt-4" style={{ backgroundColor: '#6088ff' }}>
                                    <Card.Body >
                                        <Card.Title style={{ color: 'whitesmoke' }}>Asignaciones</Card.Title>
                                        {practicas_user.map((practica_user, index) => (
                                            <Card key={index} className="mb-3">
                                                <Card.Body style={{ backgroundColor: '#eaeaea' }}>
                                                    <Card.Title style={{ color: 'black' }}>
                                                        {practica_user.practicaAsignada.titulo}
                                                    </Card.Title>
                                                    <Card.Text style={{ color: 'gray' }}>

                                                        {practica_user.practicaAsignada}
                                                        {practica_user.practicaAsignada.curso}

                                                    </Card.Text>
                                                </Card.Body>
                                                <Button variant='primary' onClick={() => mostrarAlerta(`Asignación: `)}>
                                                    Realizar Asignación
                                                </Button>
                                            </Card>
                                        ))}
                                    </Card.Body>
                                </Card>

                                <div className="mt-4">
                                    <Card>
                                        <Card.Header>
                                            <h4 className="text-lg font-bold mb-2">Actividades del Año Académico</h4>
                                        </Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Introducción al Desarrollo Web</ListGroup.Item>
                                            <ListGroup.Item>Bases de HTML</ListGroup.Item>
                                            <ListGroup.Item>Estilización con CSS</ListGroup.Item>
                                            <ListGroup.Item>Fundamentos de JavaScript</ListGroup.Item>
                                            <ListGroup.Item>Desarrollo de Proyectos</ListGroup.Item>
                                            <ListGroup.Item>Entrega del Proyecto Final</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </div>

                                <div className="mt-4">

                                    <div className=" text-end mt-4" >
                                        <Button variant='primary' onClick={() => mostrarAlertaBootstrap(`Profesor: `)}>
                                            Info Profesor Encargado
                                        </Button>
                                    </div>
                                </div>
                                <div className="container" style={{ margin: '20px' }}>

                                </div>
                            </div>

                        )
                }



            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Práctica</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmint}>

                        <Form.Group controlId="formPracticaNombre">
                            <Form.Label>Nombre de la Práctica</Form.Label>
                            <Form.Control 
                            value={titulo}
                            name='titulo'
                            type="text" 
                            placeholder="Ingrese el nombre de la práctica" 
                            onChange={(event) => handleInputChangeAll(event)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPracticaObjetivo">
                            <Form.Label>Objetivo/s</Form.Label>
                            {objetivo.map((objetivo, index) => (
                                <InputGroup key={index} className="mb-3">
                                    <FormControl
                                        placeholder="Ingrese un objetivo"
                                        value={objetivo}
                                        name='objetivo'
                                        type="text"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />

                                    <Button variant="outline-secondary" onClick={() => handleRemoveObjetivo(index)}>Eliminar</Button>


                                </InputGroup>
                            ))}
                            <Button variant="primary" onClick={handleAddObjetivo}>Agregar otro objetivo</Button>
                        </Form.Group>

                        <Form.Group controlId="formPracticaActividad">
                            <Form.Label>Actividades</Form.Label>

                            {
                                actividad.map((actividad, index) => (
                                    <InputGroup key={index} className="mb-3">
                                        <FormControl
                                            placeholder="Ingrese una actividad"
                                            value={actividad}
                                            name='actividad'
                                            type="text"
                                            onChange={(event) => handleInputChangeActividad(index, event)}
                                        />

                                        <Button variant="outline-secondary" onClick={() => handleRemoveActividad(index)}>Eliminar</Button>
                                    </InputGroup>
                                ))

                            }
                            <Button variant="primary" onClick={handleAddActividad}>Agregar otra actividad</Button>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};

// Función para mostrar una alerta con el mensaje que recibe como parámetro
function mostrarAlerta(mensaje) {
    // Crea un div con la clase "alert" y el tipo "info" de Bootstrap
    const alerta = document.createElement('div');
    alerta.classList.add('alert', 'alert-info', 'position-fixed', 'top-0', 'end-0', 'mt-5');
    alerta.setAttribute('role', 'alert');
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => {
        document.body.removeChild(alerta);
    }, 3000);
}

function mostrarAlertaBootstrap(mensaje) {
    // Crea un div con la clase "alert" y el tipo "info" de Bootstrap
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-info');
    alert.setAttribute('role', 'alert');

    // Añade el mensaje de la alerta
    alert.textContent = mensaje;

    // Añade la alerta al cuerpo de la página
    document.body.appendChild(alert);

    // Oculta la alerta después de 3 segundos
    setTimeout(function () {
        alert.style.display = 'none';
    }, 3000);
}

export default CursoDetalle;
