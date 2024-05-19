// Estado a definir para el contexto de usuario
import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import axios from 'axios';
import PropTypes from 'prop-types';

// ...

const UserState = (props) => {
    const initialState = {
        users: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
            { id: 3, name: 'Tom Smith' }
        ],
        selectedUser: null,
        selectedUserCurso: null
    };
    const [state, dispatch] = useReducer(UserReducer, initialState);


    const getUsers = async () => {
       const res = await axios.get('http://localhost:4000/user/student')
                dispatch({
                    type: 'GET_USERS',
                    payload: res.data.studentInfo
                    
                })
        
            console.log("state",res);
    }

    const getUser = async (id) => {
        const res =  await axios.get(`http://localhost:4000/user/${id}`)
        dispatch({
            type: 'GET_USER',
            payload: res.data
        })

        console.log(res);
               
    }

    const getCurso = async (id) => {
        const res =  await axios.get(`http://localhost:4000/enroll/${id}`)
        dispatch({
            type: 'GET_CURSO',
            payload: res.data.enrolledCourses
        })

        console.log('curso',res);
               
    }


  
    return (
        <UserContext.Provider value={{
            users: state.users,
            selectedUser: state.selectedUser,
            selectedUserCurso: state.selectedUserCurso,
            getUsers,
            getUser,
            getCurso,
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

UserState.propTypes = {
    children: PropTypes.node.isRequired
}; 

export default UserState;