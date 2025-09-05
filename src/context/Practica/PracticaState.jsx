import { useReducer } from 'react';
import PracticaContext from './PracticaContext';
import PracticaReducer from './PracticaReducer';
import PropTypes from 'prop-types';
import axios from 'axios';

const PracticaState = (props) => {
    const initialState = {
        practicas: [],
        practicas_user: [],
        practicas_course: [],
        practicas_course_estudiante: [],
        practicas_user_teacher: [],
        practica: null,
        loading: true,
        error: {}
    };
    
    const [state, dispatch] = useReducer(PracticaReducer, initialState);
   
    // Get Practicas
    const getPracticas = async () => {
        try {
        const res = await axios.get('http://localhost:4000/practica/getPracticas', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data = await res.json();
        dispatch({
            type: "GET_PRACTICAS",
            payload: data
        });
        } catch (err) {
        console.error(err);
        }
    };

    // Get Practica por curso
    const getPracticasByCurso = async (id) => {
        console.log(' getPracticasByCurso  ');
        try {
        const res = await axios.get(`http://localhost:4000/practica/get-pr-by-curso/${id}`, {
          
        });
        console.log('datos practica CURSO ',res.data.practicas);
       
        dispatch({
            type: "GET_PRACTICAS_BY_COURSE",
            payload: res.data.practicas
        });
        }
        catch (err) {
        console.error(err);
        }
    };


    //get Practicas por Profesor
    const getPracticasByProfesor = async (id) => {
        try {
        const res = await axios.get(`http://localhost:4000/practica/get-pr-by-profesor/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log('datos practica PROFE',res.data.practicas);
        dispatch({
            type: "GET_PRACTICAS_BY_USER_TEACHER",
            payload: res.data.practicas
            });

        }   
        catch (err) {
        console.error(err);
        }
    };

    //get practicaEstado por curso (se lista las practicas que realizan los estudiantes en un curso)
    const getPracticasEstadoByCurso = async (id) => {
        try {
        const res = await axios.get(`http://localhost:4000/practicaEstado/get-pr-by-curso/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log('datos practicaEstado CURSO',res.data.practicasCurso
        );
        dispatch({
            type: "GET_PRACTICAS_BY_COURSE_ESTUDIANTES",
            payload: res.data.practicasCurso
            
            });

        }   
        catch (err) {
        console.error(err);
        }
    }

    
    // Get Practica
    const getPractica = async (id) => {
        try {
        const res = await axios.get(`http://localhost:4000/practica/get-one-pr/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data = await res.json();
        dispatch({
            type: "GET_PRACTICA",
            payload: data
        });
        } catch (err) {
        console.error(err);
        }
    };
    
    // Add Practica
    const addPractica = async (titulo, objetivo, actividad, estado, cursoId, createdAt) => {
        try {
        const res = await axios.post('http://localhost:4000/practica/create-practica-for-curse', {titulo, objetivo, actividad, estado, curso: cursoId, createdAt}, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
       console.log('DTOOOSSSS practica',res);
        dispatch({
            type: "ADD_PRACTICA",
            payload: res.data
        });
        } catch (err) {
        console.error(err);
        }
    };
    
    // Update Practica
    const updatePractica = async (practica) => {
        {console.log('datos practica',practica)}
        try {
        const res = await axios.put(`http://localhost:4000/practicaEstado/update-pr`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: (practica)
        });
       console.log("data practica update", res);
     
        dispatch({
            type: "UPDATE_PRACTICA",
            payload: res.data
        });
        }
        catch (err) {
        console.error(err);
        }
    }
     // Update calificacion Practica
     const updateCalificacionPractica = async (practicaEstadoId , calificacion) => {
        {console.log('DATOSSSS practica',calificacion, " ", practicaEstadoId)}
        try {
        const res = await axios.put(`http://localhost:4000/practicaEstado/add-calificar-pr`,{calificacion, practicaEstadoId}, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
             
        });
        const data = await res;
        {console.log('datos data',res.data.result)}
        dispatch({
            type: "UPDATE_PRACTICA",
            payload: data.data.result
        });
        }
        catch (err) {
        console.error(err);
        }
    }
       // Update comentario Practica
       const updateComentarioPractica = async (practicaEstadoId , comentario) => {
        {console.log('DATOSSSS comentario practica',comentario, " ", practicaEstadoId)}
        try {
        const res = await axios.put(`http://localhost:4000/practicaEstado/add-comentario-pr`,{comentario, practicaEstadoId}, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        });
        const data = await res;
        {console.log('datos data',res)}
        dispatch({
            type: "UPDATE_PRACTICA",
            payload: data
        });
        }
        catch (err) {
        console.error(err);
        }
    }

    // Elimina la practica del state de practicas y retorna las practicas que no coincidan con el id de la practica eliminada
    // El payload es el id de la practica a eliminar
    //Funcion para el profesor & admin
    const deletePractica = async (id) => {
        try {
        await axios.delete(`http://localhost:4000/practica/deletePractica/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch({
            type: "DELETE_PRACTICA",
            payload: id
        });
        } catch (err) {
        console.error(err);
        }
    };

    // Clear Practica
    const clearPractica = () => {
        dispatch({
        type: "CLEAR_PRACTICA"
        });
    };

    // Set Loading
    const setLoading = () => {
        dispatch({
        type: "SET_LOADING"
        });
    };


    // Listar practicas Estado por estudiante ID
    const getPracticasByEstudiante = async () => {
        try {
            const id = JSON.parse(localStorage.getItem("usuario"))._id;
        const res = await axios.get(`http://localhost:4000/practicaEstado/get-pr-by-user/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log('datos id user',id);
       console.log('datos practica ESTUDIANTE',res);
        dispatch({
            type: "GET_PRACTICAS_BY_USER",
            payload: res.data.practicasEstado
        });
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <PracticaContext.Provider
        value={{
            practicas: state.practicas,
            practicas_user: state.practicas_user,
            practicas_course: state.practicas_course,
            practicas_course_estudiante: state.practicas_course_estudiante,
            practicas_user_teacher: state.practicas_user_teacher,
            
            practica: state.practica,
            loading: state.loading,
            error: state.error,
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


        }}
        >
        {props.children}
        </PracticaContext.Provider>
    );
}

PracticaState.propTypes = {
    children: PropTypes.object
}

export default PracticaState;
