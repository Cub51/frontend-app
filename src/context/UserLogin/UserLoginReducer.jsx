import { LOGIN_SUCCESS, LOGOUT } from '../types';

const userLoginReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                usuario: payload.usuario,
                token: payload.token,
                rol: payload.rol,
            }
        case LOGOUT:
            return {
                ...state,
                usuario: null,
                token: null,
                rol: null,
            }
        default:
            return state;
    }

}

export default userLoginReducer;