import { CLEAR_PROFILE, GET_PROFILE, UPDATE_PROFILE } from '../types';

const profileReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload.profile,
                nombre: payload.nombre,
                apellido: payload.apellido,
                correo: payload.correo,
                estado: payload.estado,
                
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }

}

export default profileReducer;