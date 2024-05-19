// Autor: Jean Agreda

import styles from '../../components/styles.module.scss';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import CursoContext from '../../context/Curso/CursoContext';
import CardCourse from '../../components/Card/Card';
import { useParams } from 'react-router-dom';
const Course = () => {

  const {
    cursos,
    getCursos,
    errorCurso,
    cursos_usuario,
    loading,
    error,
    getCurso,
    matricularseCurso,
    listarCursosMatriculados,
} = useContext(CursoContext);

  useEffect(() => {
    getCursos();
listarCursosMatriculados();
  }, []);


  return (

  <>
    <div >    
       <h1>Cursos</h1>
       <div >
 
     
 { CardCourse(cursos)}
       </div>
     </div>
 
  </>
  );

};

export default Course;
