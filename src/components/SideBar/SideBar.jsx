import { useEffect, useState } from "react";
import { FaHome, FaBars, FaUser, FaChalkboardTeacher, FaChalkboard, FaCogs, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaTimes } from "react-icons/fa";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const NavigatorTop = () => {
  const [show, setShow] = useState(false);
  const [userText, setUserText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Elimina todo el localStorage
    navigate("/", { replace: true }); // Redirige al inicio y reemplaza el historial
  };


  useEffect(() => {
    // Obtener el objeto completo desde localStorage
    const usuarioJSON = localStorage.getItem("usuario");

    if (usuarioJSON) {
      try {
        const usuario = JSON.parse(usuarioJSON); // Parseamos el JSON
        const nombre = usuario.nombre || "";
        const rol = usuario.rol || "";

        setUserText(`${rol} ${nombre}`); // Ej: "Profesor AAdd"
      } catch (error) {
        console.error("Error parseando localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="menu-button d-flex align-items-center">
        <FaBars />
        <span> Menu </span>
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ maxWidth: "200px" }}
        data-bs-theme="dark"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> {userText} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link
              href="/"
              style={{ padding: "10px" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            ><FaHome /> Area Personal
            </Nav.Link>

            <Nav.Link
              href="/courses"
              style={{ padding: "10px" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            >
              <FaChalkboardTeacher /> Cursos
            </Nav.Link>
            <Nav.Link
              href="/courses/mycourses"
              style={{ padding: "10px" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            ><FaChalkboard />Mis Cursos
            </Nav.Link>

            <Nav.Link
              href="/labDT"
              style={{ padding: "10px" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            ><FaCogs /> Dibujo Tecnico
            </Nav.Link>

            <Nav.Link
              href="/lab"
              style={{ padding: "10px" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            ><FaCogs /> Dibujo Libre
            </Nav.Link>

            <Nav.Link
              eventKey="link-2"
              href="/usersList/students"
              style={{ padding: "10px" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            ><FaUser /> Estudiante
            </Nav.Link>

            <Nav.Link
              eventKey="link-3"
              href="/usersList/teachers"
              style={{
                padding: "10px",
                link: { hover: { backgroundColor: "#4235d6" } },
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            ><FaUser />
              Profesor
            </Nav.Link>

            <Nav.Link
              eventKey="link-4"
              href="/usersList/admins"
              style={{
                padding: "10px",
                link: { hover: { backgroundColor: "#4235d6" } },
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            >< FaUserPlus />
              Administrador
            </Nav.Link>

            <Nav.Link
              href="/login"
              className="justify-content-end"
              style={{
                padding: "10px",
                link: { hover: { backgroundColor: "#4235d6" } },
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            > <FaSignInAlt />
              Iniciar Sesion
            </Nav.Link>

            <Nav.Link
              href="/register"
              className="justify-content-end"
              style={{
                padding: "10px",
                link: { hover: { backgroundColor: "#4235d6" } },
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
            > <FaUserPlus />
              Registrarse
            </Nav.Link>

            <Nav.Link
              href="/"
              className="justify-content-end"
              style={{
                padding: "10px",
                link: { hover: { backgroundColor: "#4235d6" } },
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6358dc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
              onClick={handleLogout}
            >  <FaSignOutAlt />
              Cerrar Sesion
            </Nav.Link>
          
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavigatorTop;
