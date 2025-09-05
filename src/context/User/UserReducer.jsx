import { GET_USER, GET_USERS, GET_CURSO, UPDATE_USER, CLEAR_USER, CLEAR_USERS,DELETE_USER } from "../types";

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload
            }
        case GET_USER:
            return {
                ...state,
                selectedUser: payload
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user._id === payload.userToUpdate._id ? payload.userToUpdate : user),
                mensaje: payload.data.message
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== payload.userInfo._id)
            }
        case CLEAR_USER:
            return {
                ...state,
                selectedUser: null
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: []
            }
        case GET_CURSO:
            return {
                ...state,
                selectedUserCurso: payload
            }
        default:
            return state;
    }

}

export default userReducer;
