
import { useReducer } from "react";
import UserLoginContext from "./UserLoginContext";
import UserLoginReducer from "./UserLoginReducer";
import PropTypes from 'prop-types';

const UserLoginState = (props) => {
    const initialState = {
        usuario: null,
        token: null,
        rol: null,
    };

    const [state, dispatch] = useReducer(UserLoginReducer, initialState);

    // Funciones

    const checkRolAdmin = () => {
        const { rol } = state;
        if (rol === 'Administrador') {
            return true;
        } else {
            return false;
        }
    }

    const checkRolEstudiante = () => {
        const { rol } = state;
        if (rol === 'Estudiante') {
            return true;
        } else {
            return false;
        }
    }

    const checkRolProfesor = () => {
        const { rol } = state;
        if (rol === 'Profesor') {
            
            return true;
        } else {
            return false;
        }
    }

    const checkRol = () => {
        const { rol } = state;
      
            if (rol === 'Administrador') {
                console.log("rol", rol);
                return rol;
            }
            if (rol === 'Estudiante') {
                console.log("rol", rol);
                return rol;
            }
            if (rol === 'Profesor') {
                console.log("rol", rol);
                return rol;
            }
       
    }
    // Login de usuario
    const getloginUser = async (usuario, token, rol) => {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("rol", usuario.rol);

        dispatch({ type: "LOGIN_SUCCESS", payload: { usuario: usuario, token: token, rol: rol } });
        checkRol();
    };

    // Logout de usuario
    const setlogoutUser = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        dispatch({ type: "LOGOUT" });
    };

    // validar caducidad de token
     const validarToken = async () => {
         const token = localStorage.getItem("token");
         if (token) {
             const token = localStorage.getItem("token");
             const usuario = localStorage.getItem("usuario");
             const rol = localStorage.getItem("rol");
             dispatch({ type: "LOGIN_SUCCESS", payload: { usuario: usuario, token: token, rol: rol } });
         } else {
             dispatch({ type: "LOGOUT" });
         }
     };

  

    // Retornar el contexto
    return (
        <UserLoginContext.Provider
            value={{
                user: state.user,
                token: state.token,
                rol: state.rol,
                getloginUser,
                setlogoutUser,
                checkRolAdmin,
                checkRolEstudiante,
                checkRolProfesor,
                checkRol,
                validarToken,
            }}
        >
            {props.children}
        </UserLoginContext.Provider>
    );
};

UserLoginState.propTypes = {
    children: PropTypes.node.isRequired
};

export default UserLoginState;