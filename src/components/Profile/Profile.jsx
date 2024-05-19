
import { useContext } from 'react';
import UserContext from '../../context/User/UserContext';


const Profile = () => {
    // const [count, setCount] = useState(0)
    const { selectedUser, selectedUserCurso } = useContext(UserContext);
   

    return (
        <>
            {console.log("seled", selectedUser)}
            {selectedUser ? (
                <div>
                    <h1>{selectedUser.resto.nombre}</h1>
                    <p>{selectedUser.resto.apellido}</p>
                    <p>{selectedUser.resto.correo}</p>
                    <p>{selectedUser.resto.estado}</p>
                    <p>{selectedUser.resto.rol}</p>
                </div>
            ) : (<h1>No usuario</h1>)}


            {console.log("cssel", selectedUserCurso)}
            {selectedUserCurso ? (
                <div>
                    <h1>{selectedUserCurso.userId}</h1>

                </div>
            ) : (<h1>No DATA</h1>)}

        </>
    )
}

export default Profile;
