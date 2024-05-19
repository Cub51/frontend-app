import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import styles from "../../components/styles.module.scss";
import { Container } from "react-bootstrap";

const Welcome = () => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${id}`)
      .then(({ data }) => {
        setName(data.resto.nombre);
        setLastName(data.resto.apellido);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
   <div className={styles.container_general}>
 <div className={styles.welcome}>
      <h3>{id? `¡Felicitaciones ${name}  ${lastName}!` : "¿Que estas haciendo? 🕵️‍♂️"}</h3>
      <h2>{id? "Te pudiste logear correctamente🎉" : "Te estamos viendo..."}</h2>
      <div className={styles.buttons}>
        <button onClick={() => navigate("/profile")}>Ver Perfil</button>
        <button onClick={() => navigate("/courses")}>Ver cursos</button>
      </div>
    </div>

   </div>
  );
};

export default Welcome;