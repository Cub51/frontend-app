// Estado a definir para el contexto de usuario
import { useReducer, useMemo } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import axios from 'axios';
import PropTypes from 'prop-types';

const UserState = (props) => {
    const initialState = {
        users: null,
        selectedUser: null,
        selectedUserCurso: null,
        mensaje: null

    };
    const [state, dispatch] = useReducer(UserReducer, initialState);


    const getUsers = async () => {
        const res = await axios.get('http://localhost:4000/user/student')
        dispatch({
            type: 'GET_USERS',
            payload: res.data.studentInfo
        })
        console.log("state", res);
    }

    const getUsersTeacher = async () => {
        const res = await axios.get('http://localhost:4000/user/teacher')
        dispatch({
            type: 'GET_USERS',
            payload: res.data.teacherInfo
        })
        console.log("state", res);
    }

        const getUsersAdmin = async () => {
        const res = await axios.get('http://localhost:4000/user/admin')
        dispatch({
            type: 'GET_USERS',
            payload: res.data.adminInfo
        })
        console.log("state", res);
    }

    const getUser = async (id) => {
        const res = await axios.get(`http://localhost:4000/user/${id}`)
        dispatch({
            type: 'GET_USER',
            payload: res.data
        })
        console.log("res data", res);
    }

    const updateUser = async (user) => {
        console.log("user", user);
        const res = await axios.put(`http://localhost:4000/user/update`, user,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
        /*
        dispatch({
            type: 'UPDATE_USER',
            payload: res.data
        })*/
        console.log("update data", res);
    }

    const deleteUser = async (id) => {
        console.log("id", id);
        const res = await axios.delete(`http://localhost:4000/user/delete/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log("res", res);

        dispatch({
            type: 'DELETE_USER',
            payload: res.data
        })
    }

    const getCurso = async (id) => {
        const res = await axios.get(`http://localhost:4000/enroll/${id}`)
        dispatch({
            type: 'GET_CURSO',
            payload: res.data.enrolledCourses
        })
        console.log('curso', res);
    }

    return useMemo(() => (
        <UserContext.Provider value={{
            users: state.users,
            selectedUser: state.selectedUser,
            selectedUserCurso: state.selectedUserCurso,
            getUsers,
            getUser,
            getCurso,
            updateUser,
            deleteUser,
            getUsersTeacher,
            getUsersAdmin,
            mensaje: state.mensaje,
            clearUser: () => dispatch({ type: 'CLEAR_USER' }),
            clearUsers: () => dispatch({ type: 'CLEAR_USERS' }),
        }}>
            {props.children}
        </UserContext.Provider>
    ), [state, dispatch, props.children]);
}

UserState.propTypes = {
    children: PropTypes.node.isRequired
};

export default UserState;