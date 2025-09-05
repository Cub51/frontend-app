import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import ProfileComp from './components/Profile/Profile';

//context
import UserState from './context/User/UserState';
import UserLoginState from './context/UserLogin/UserLoginState';
import ProfileState from './context/Profile/ProfileState';
import CursoState from './context/Curso/CursoState';
import PracticaState from './context/Practica/PracticaState';

//test
import CursoDetalle from './Pages/Curses/MyCourses/MyCourseDetails';
import PageNotFound from './Pages/NotFound/NotFound';
import DashboardSt from './Pages/Dashboard/Dashboard';

/* The following line can be included in a src/App.scss */
import 'bootstrap/dist/css/bootstrap.min.css';

// componentes
import UsersTeacherList from './components/UsersList/UserListTeacher';
import UsersAdminList from './components/UsersList/UserListAdmin';

//pages
import Curses from './Pages/Curses/Curses';
import About from './components/About/About';
import Users from './components/UsersList/UserList';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Welcome from './Pages/Welcome/Welcome';
import Home from './Pages/Home/Home';
import NavigatorTop from './components/Navigator/Navigator';
import Profile from './Pages/Profile/Profile';
import MyCourses from './Pages/Curses/MyCourses/MyCourses';

import Lab from './Pages/LabDT/LabDt';
import LabDT from './Pages/LabDT/LabDTkonva';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import styles from './App.module.scss';

function App() {
  const [count, setCount] = useState(0);


  return (
    <BrowserRouter>
      <div className={styles.main} >
        <div className={styles.top_nav_bar}>
          <NavigatorTop />
        </div>
        <UserState>
          <div className="container">

            <div className="row">
              <div className="col-md-7">
                {/*  <UserList />*/}
              </div>
              <div className="col-md-5">
                {/*  <ProfileComp /> */}
              </div>
            </div>
          </div>


        </UserState>




        <div style={{ backgroundColor: '#ffffff' }}> {/* Revisar CONTAINER quitar limitaciones para practica,
        se arregla problema de posicion de puntero para clase lab 
        eliminar cualquier configuracion solo para el lab trabajar con configuraciones propias dentro de los botons*/}
          <UserLoginState >
            <ProfileState>
              <CursoState>
                <PracticaState>
                <UserState>
                  <Routes>
                  
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    
                    <Route path="/register" element={<Register />} />
                    <Route path="/courses/mycourses" element={<MyCourses />} />
                    
                    
                    <Route path="/coursesDetalle" element={<CursoDetalle/>} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/dashboard" element={<DashboardSt />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/usersList/students" element={<Users />} />
                    <Route path="/usersList/teachers" element={<UsersTeacherList />} />
                    <Route path="/usersList/admins" element={<UsersAdminList />} />


                    <Route path="/lab" element={<Lab />} />
                    <Route path="/labDT/" element={<LabDT />} />


                    <Route path="/courses" element={<Curses />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/welcome/:id" element={<Welcome />} />

                  </Routes>
                  </UserState>
                </PracticaState>
              </CursoState>
            </ProfileState>
          </UserLoginState>
        </div>

      </div>

    </BrowserRouter>

  )
}
export default App