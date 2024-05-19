import { GET_CURSOS, GET_CURSOS_USUARIO, GET_CURSO, ADD_CURSO, DELETE_CURSO, UPDATE_CURSO, MATRICULARSE_CURSO } from '../types';

const cursoReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_CURSOS:
            return {
                ...state,
                cursos: payload,
                loading: false
            }
        case GET_CURSOS_USUARIO:
            return {
                ...state,
                cursos_usuario: payload,
                loading: false
            }
        case GET_CURSO:
            return {
                ...state,
                curso: payload,
                loading: false
            }
        case ADD_CURSO:
            return {
                ...state,
                cursos: [...state.cursos, payload],
                loading: false
            }
        case UPDATE_CURSO:
            return {
                ...state,
                cursos: state.cursos.map(curso => curso._id === payload._id ? payload : curso),
                loading: false
            }
        case DELETE_CURSO:
            return {
                ...state,
                cursos: state.cursos.filter(curso => curso._id !== payload),
                loading: false
            }
        case MATRICULARSE_CURSO:
            return {
                ...state,
                cursos_usuario: [...state.cursos_usuario, payload],
                errorCurso: payload.errorCurso,
                loading: false
            }
        default:
            return state;
    }

}

export default cursoReducer;