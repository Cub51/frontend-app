// Autor: Jean Agreda
import {useContext} from 'react';
import UserContext from '../../context/User/UserContext';
import { useEffect } from 'react';

const Users = () => {


    const { users, getUsers, getUser, getCurso } = useContext(UserContext);
    useEffect(() => {
        getUsers();
     
    
        // eslint-disable-next-line
    }, []);



    return ( 
        <div>
            
            <div className="list-group h-100">
                
                {
                    users && users.map(user => (        
                        <a href="#" key={user._id} onClick={() =>{ getCurso(user._id), getUser(user._id)} }>
                            {user.nombre} && apellido: {user.apellido}  
                        </a>
                    ))
                }
          
            </div>
        </div>
    );

};

export default Users;
