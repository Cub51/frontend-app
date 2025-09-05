// Autor: Jean Agreda
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../context/User/UserContext";
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Modal,
    Form,
} from "react-bootstrap";
import styles from "../../components/styles.module.scss";

const Users = () => {
    const { users,
        getUsersTeacher,
        updateUser,
        deleteUser
    } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [showModalContra, setShowModalContra] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        _id: "",
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
    });
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        correo: "",
    });

    const [inputs, setInputs] = useState({
        nombre: "",
        correo: "",
        apellido: "",
        contrasena: "",
        rol: "Profesor",
    });

    const { nombre, apellido, contrasena, correo, rol } = inputs;
    const [mensaje, setMensaje] = useState();
    const onChangeUserAdd = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleShowModalUserAdd = () => {
        setShowModalUser(true);
    };

    const handleCloseModalUserAdd = () => {
        setShowModalUser(false);
    };

    const handleSaveUserAdd = async () => {
        var mensajeAux;
        if (nombre !== "" && contrasena !== "" && correo !== "") {
            if (contrasena.length < 8) {
                setMensaje("La contraseña debe tener minimo 8 caracteres");
                setTimeout(() => {
                    setMensaje("");

                }, 1500);
                return;
            }
            if (nombre.length < 3) {
                setMensaje("El nombre debe tener minimo 3 caracteres");
                setTimeout(() => {
                    setMensaje("");
                }, 1500);
                return;
            }
            const Usuario = {
                nombre,
                apellido,
                correo,
                contrasena,
                rol,
            };

            await axios
                .post("http://localhost:4000/register/", Usuario)
                //.then(({data}) => console.log(data));
                .then(({ data }) => {
                    mensajeAux = data.message;
                    setMensaje(data.message);
                    console.log("data", data);
                    setInputs({ nombre: "", apellido: "", correo: "", contrasena: "" });
                    setTimeout(() => {
                        setMensaje("");
                    }, 1500);
                })
                .catch((error) => {
                    console.error(error);
                    setMensaje(error.response.data.message);
                    setTimeout(() => {
                        setMensaje("");
                    }, 1500);
                });
        } else {
            setMensaje("Falta llenar campos");
            setTimeout(() => {
                setMensaje("");
            }, 1500);
        }

        if (mensajeAux == "Perfil creado exitosamente") {
            setShowModalUser(false);
            getUsersTeacher();
        }
        setInputs({
            nombre: "",
            apellido: "",
            correo: "",
            contrasena: "",
            rol: "Profesor",
        });
    };


    const [formContraData, setFormContraData] = useState({ contrasena: "" });
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        getUsersTeacher();
        setShowAlert(false);
    }, [setShowAlert]);

    //#region Contraseña
    const handleShowModalContrasena = (user) => {
        setSelectedUser(user);
        setShowModalContra(true);
    };

    const handleCloseModalContrasena = () => {
        setShowModalContra(false);
    };
    const handleContraChange = (e) => {
        setFormContraData({ ...formData, [e.target.name]: e.target.value });
        setUpdatedUser({
            ...updatedUser,
            _id: selectedUser._id,
            [e.target.name]: e.target.value,
        });
    };
    //#endregion
    // usuario
    const handleShowModal = (user) => {
        setSelectedUser(user);
        setFormData({
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setUpdatedUser({
            ...updatedUser,
            _id: selectedUser._id,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        updateUser(updatedUser);
        setShowAlert(true);
        setUpdatedUser({
            _id: "",
            nombre: "",
            apellido: "",
            correo: "",
            contrasena: "",
        });
        setFormData({ nombre: "", apellido: "", correo: "" });
        setFormContraData({ contrasena: "" });
        setSelectedUser(null);
        handleCloseModal();
        handleCloseModalContrasena();
    };

    const handleDeleteUser = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            setShowAlert(true);
            mostrarAlerta("Usuario eliminado correctamente.", "alert-danger");
            deleteUser(id);
        }
    };

    return (
        <div className={styles.container_generaal}>
            <h2 className="my-4">Lista de Profesores</h2>
            <Container>
                <Row style={{ justifyContent: 'left' }}>       
                    <Col key={1} sm={12} md={6} lg={4} className="mb-4" >
                        <Card style={{ textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title >
                                    <strong>  Agregar usuario Profesor </strong>
                                </Card.Title>
                                <Card.Text>
                                    Agrega nuevos usuarios con un solo clic.
                                </Card.Text>
                                <Button
                                    variant="success"
                                    onClick={() => {
                                        handleShowModalUserAdd(), setShowAlert(true);
                                    }}
                                    className="me-2"
                                >
                                    + Agregar Profesor
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {users &&
                        users.map((user) => (
                            <Col key={user._id} sm={12} md={6} lg={4} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            {user.nombre} {user.apellido}
                                        </Card.Title>
                                        <Card.Text>
                                            <div style={{ color: "gray" }}>
                                                <strong> Estado:</strong> {user.estado}
                                                <br />
                                                <strong> Tipo:</strong> {user.rol}
                                                <br />
                                                <strong>Fecha de Registro:</strong>{" "}
                                                {new Date(user.fechaRegistro).toLocaleDateString(
                                                    "es-ES",
                                                    { day: "numeric", month: "long", year: "numeric" }
                                                )}
                                                <br />
                                                <strong>Ultima Actualización:</strong>{" "}
                                                {new Date(user.fechaActualizacion).toLocaleDateString(
                                                    "es-ES",
                                                    { day: "numeric", month: "long", year: "numeric" }
                                                )}
                                                <br />
                                            </div>
                                            <strong> Correo: </strong> {user.correo}
                                            <br />
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                handleShowModal(user), setShowAlert(true);
                                            }}
                                            className="me-2"
                                        >
                                            Actualizar
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                handleShowModalContrasena(user), setShowAlert(true);
                                            }}
                                            className="me-2"
                                        >
                                            Contraseña
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                handleDeleteUser(user._id);
                                            }}
                                            className=""
                                        >
                                            Borrar
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Información del Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSave(),
                                showAlert &&
                                (mostrarAlerta(
                                    "Usuario actualizado correctamente.",
                                    "alert-success"
                                ),
                                    setShowAlert(false));
                        }}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalContra} onHide={handleCloseModalContrasena}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Contraseña del Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formContrasena">
                            <Form.Label>Nueva Contraseña</Form.Label>
                            <Form.Control
                                type="text"
                                name="contrasena"
                                value={formContraData.contrasena}
                                onChange={handleContraChange}
                                required
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalContrasena}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSave(),
                                showAlert &&
                                (mostrarAlerta(
                                    "Contraseña actualizado correctamente.",
                                    "alert-success"
                                ),
                                    setShowAlert(false));
                        }}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalUser} onHide={handleCloseModalUserAdd}>
                <Modal.Header closeButton>

                    <Modal.Title>Agregar Profesor</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={inputs.nombre}
                                onChange={onChangeUserAdd}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formApellido">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido"
                                value={inputs.apellido}
                                onChange={onChangeUserAdd}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCorreo">
                            <Form.Label>Correo </Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={inputs.correo}
                                onChange={onChangeUserAdd}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formContrasena">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="text"
                                name="contrasena"
                                value={inputs.contrasena}
                                onChange={onChangeUserAdd}
                                required
                            />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}> <div>
                    <br /></div>{mensaje && <div className={styles.toast_user}>{mensaje}</div>}
                </Modal.Footer>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalUserAdd}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSaveUserAdd()
                        }}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

function mostrarAlerta(mensaje, tipo) {
    // Crea un div con la clase "alert" y el tipo "info" de Bootstrap
    const alerta = document.createElement("div");
    alerta.classList.add(
        "alert",
        tipo,
        "position-fixed",
        "top-0",
        "end-0",
        "mt-5"
    );
    alerta.setAttribute("role", "alert");
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => {
        document.body.removeChild(alerta);
    }, 3000);
}

export default Users;
