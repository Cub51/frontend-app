import { useEffect, useReducer } from "react";
import CursoContext from "./CursoContext";
import CursoReducer from "./CursoReducer";
import PropTypes from 'prop-types';
import axios from "axios";

const CursoState = (props) => {

    const initialState = {
        cursos: [],
        cursos_usuario: [],
        curso: null,
        loading: true,
        message: null,
        error: {},
        errorCurso: null, //validar si el curso ya esta matriculado
    };

    const [state, dispatch] = useReducer(CursoReducer, initialState);

    // Get Cursos
    const getCursos = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/curso/get-courses`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log('todo cursos ', res.data);
            dispatch({
                type: "GET_CURSOS",
                payload: res.data.courses
            });
        } catch (err) {
            console.error(err);
        }
    };

    const getCursosTeacher = async () => {
        try {
        
            const id = JSON.parse(localStorage.getItem("usuario"))._id;
            const res = await axios.get(`http://localhost:4000/curso/get-courses-teacher/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log('teacher cursos ', res.data);
            dispatch({
                type: "GET_CURSOS_USUARIO",
                payload: res.data.courses
            });
        } catch (err) {
            console.error(err);
        }
    }

    // Get Curso
    const getCurso = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/curso/get-course/${id}`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log('res.data.course ', res.data.course);
            dispatch({
                type: "GET_CURSO",
                payload: res.data.course

            });
        } catch (err) {
            console.error(err);
        }
    };

    // Add Curso
    const addCurso = async (curso) => {
        try {
            console.log("curso add ", curso);
            const res = await axios.post(`http://localhost:4000/curso/post-course/`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: curso
            });
            console.log("res add ", res);
            dispatch({
                type: "ADD_CURSO",
                payload: res.data.result
            });
        } catch (err) {
            console.error(err);
        }
    };

    // Update Curso
    //Funcion para el profesor & admin
    // REVISAR  AÑADIR EN BACKEND
    const updateCurso = async (curso) => {
        try {
            const res = await axios.put(`http://localhost:4000/curso/update/`, curso, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log("res curso update ", res);
            dispatch({
                type: "UPDATE_CURSO",
                payload: res.data.courseUpdate
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    // Delete Curso
    const deleteCurso = async (id) => {
        try {
            // REVISAR PARA BORRADO LOGICO O FISICO
            const res = await axios.delete(`http://localhost:4000/curso/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            //const data = await res.json();
            dispatch({
                type: "DELETE_CURSO",
                payload: res.data.course
            });
        } catch (err) {
            console.error(err);
        }
    };

    //Matricularse en un curso o unirse
    const matricularseCurso = async (id) => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            const userId = usuario._id;
            const res = await axios.put(`http://localhost:4000/enroll/mat/`, {
                userId: userId,
                cursoId: id,
                rol: usuario.rol,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                });

            console.log('res ', res);// obtener mensaje de respuesta y presentarlo en pantalla
            if (res.data.enroll) {
                dispatch({
                    type: "MATRICULARSE_CURSO",
                    payload: { errorCurso: res.data.text }
                });
            } else if (res.data.result) {
                dispatch({
                    type: "MATRICULARSE_CURSO",
                    payload: { cursos_usuario: res.data.result }
                });
            }

        } catch (err) {
            console.error(err);
        }
    }

    // Listar los cursos en los que el usuario esta matriculado
    const listarCursosMatriculados = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            const userId = usuario._id;
            const res = await axios.get(`http://localhost:4000/enroll/listarMat`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    userId: userId
                }
            });
            console.log('res.data listar ', res.data.enrolledCourses[0].cursosAsignados);
            if (res.data.enrolledCourses[0].cursosAsignados != null) {
                dispatch({
                    type: "GET_CURSOS_USUARIO",
                    payload: res.data.enrolledCourses[0].cursosAsignados
                });
            } else {
                dispatch({
                    type: "GET_CURSOS_USUARIO",
                    payload: []
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <CursoContext.Provider
            value={{
                cursos: state.cursos,
                cursos_usuario: state.cursos_usuario,
                curso: state.curso,
                loading: state.loading,
                error: state.error,
                errorCurso: state.errorCurso,
                message: state.message,
                getCursos,
                getCursosTeacher,
                getCurso,
                addCurso,
                updateCurso,
                deleteCurso,
                matricularseCurso,
                listarCursosMatriculados
            }}
        >
            {props.children}
        </CursoContext.Provider>
    );
}

CursoState.propTypes = {
    children: PropTypes.node
}

export default CursoState;