import { useReducer } from "react";
import ProfileContext from "./ProfileContext";
import ProfileReducer from "./ProfileReducer";
import PropTypes from 'prop-types';
import axios from 'axios';
const ProfileState = (props) => {

    const initialState = {
        profile: null,
        //datos de usuario
        nombre: "",
        apellido: "",
        correo: "",
        estado: "", // activo | inactivo
        profiles: [], // para el listado de perfiles | usuarios | estudiantes | profesores | administradores
        loading: true,
        error: {}
    };

    const [state, dispatch] = useReducer(ProfileReducer, initialState);

    // Get Profile
    const getProfile = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("usuario")); // obtener el usuario del localstorage

            console.log("user", user._id);
            const userId = user._id;
            console.log("userID", user);
            const res = await axios.get(`http://localhost:4000/profile/getProfile/${userId}`, {
                // headers para enviar el token
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

                },

            });
            console.log("res", res);
            if (res.data) {
                console.log("res.data", res.data);
                if (res.data.perfil._id) {
                    console.log("res.data._id", res.data.perfil._id);
                    dispatch({
                        type: "GET_PROFILE",
                        payload: {profile: res.data.perfil, nombre: user.nombre, apellido: user.apellido, correo: user.correo, estado: user.estado}
                    });
                }
            }

        } catch (err) {
            console.error(err);
        }
    };


    // Add Asistencias
    const addAsistencias = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/profile/asistencias', formData, config);

            dispatch({
                type: "UPDATE_PROFILE",
                payload: res.data
            });

            //dispatch(setAlert('Asistencias Added', 'success'));
        } catch (err) {
            console.log("err", err);
        }
    }

    // Get Profiles
    const getProfiles = async () => {
        dispatch({ type: "CLEAR_PROFILE" });

        try {
            const res = await axios.get('/api/profile');

            dispatch({
                type: "GET_PROFILES",
                payload: res.data
            });
        } catch (err) {
            console.log("err", err);
        }
    };

    // Clear Profile
    const clearProfile = () => {
        dispatch({
            type: "CLEAR_PROFILE"
        });
    };

    return (
        <ProfileContext.Provider value={{
            profile: state.profile,
            profiles: state.profiles,
            loading: state.loading,
            error: state.error,

            nombre: state.nombre,
            apellido: state.apellido,
            correo: state.correo,
            estado: state.estado,



            getProfile,
            addAsistencias,
            clearProfile,
            getProfiles,
        }}>
            {props.children}
        </ProfileContext.Provider>
    );


}

ProfileState.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProfileState;