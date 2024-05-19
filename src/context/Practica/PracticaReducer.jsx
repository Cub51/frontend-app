import { GET_PRACTICAS, GET_PRACTICAS_BY_USER_TEACHER,GET_PRACTICAS_BY_USER, GET_PRACTICAS_BY_COURSE, GET_PRACTICAS_BY_COURSE_ESTUDIANTES, GET_PRACTICA, ADD_PRACTICA, DELETE_PRACTICA, UPDATE_PRACTICA, PRACTICA_ERROR, CLEAR_PRACTICA, SET_LOADING } from '../types';

const practicaReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_PRACTICAS:
            return {
                ...state,
                practicas: payload,
                loading: false
            }
        case GET_PRACTICAS_BY_USER:
                return {
                    ...state,
                    practicas_user: payload,
                    loading: false
        }
        case GET_PRACTICAS_BY_USER_TEACHER:
            return {
                ...state,
                practicas_user_teacher: payload,
                loading: false
        }
        case GET_PRACTICAS_BY_COURSE:
            return {
                ...state,
                practicas_course: payload,
                loading: false
        }
        case GET_PRACTICAS_BY_COURSE_ESTUDIANTES:
            return {
                ...state,
                practicas_course_estudiante: payload,
                loading: false
        }
        case GET_PRACTICA:
            return {
                ...state,
                practica: payload,
                loading: false
            }
        case ADD_PRACTICA:
            return {
                ...state,
                practicas: [...state.practicas, payload],
                loading: false
            }
        case UPDATE_PRACTICA:
            return {
                ...state,
                practicas: state.practicas.map(practica => practica._id === payload._id ? payload : practica),
                loading: false
            }
        // Elimina la practica del state de practicas y retorna las practicas que no coincidan con el id de la practica eliminada
        // El payload es el id de la practica a eliminar
        //Funcion para el profesor & admin
        case DELETE_PRACTICA:
            return {
                ...state,
                practicas: state.practicas.filter(practica => practica._id !== payload),
                loading: false
            }
        case PRACTICA_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PRACTICA:
            return {
                ...state,
                practica: null,
                practicas: [],
                practicas_user: [],
                practicas_user_teacher: [],
                practicas_course: [],
                practicas_course_estudiante: [],
                
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }

}

export default practicaReducer;
