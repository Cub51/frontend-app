import { GET_USER , GET_USERS, GET_CURSO} from "../types";

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
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
