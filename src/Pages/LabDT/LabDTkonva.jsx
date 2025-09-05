
import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import { useContext, useEffect } from 'react';
import Rectangle from "./Componentes/Rect";
import Linea from "./Componentes/Linea";
import Circulo from "./Componentes/Circulo";
import Konva from "konva";
import SidebarInfo from "./SideBar/SideBar";
import PracticaContext from '../../context/Practica/PracticaContext';

import { Stage, Layer, Transformer, Rect, Circle, Ellipse, Line, Image, Text, TextPath, Star, Label, RegularPolygon } from 'react-konva';
const initialRectangles = ([]);
const GRID_SIZE = 19; // Aproximadamente  5mm en pantallas con DPI estándar

const GridBackground = () => {
  const gridItems = [];

  // Calcular el número de filas y columnas basándose en el tamaño de la ventana
  const numRows = Math.ceil(window.innerHeight / GRID_SIZE) + 1;
  const numCols = Math.ceil(window.innerWidth / GRID_SIZE) + 1;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      gridItems.push(
        <Rect
          key={`${row}-${col}`}
          x={col * GRID_SIZE}
          y={row * GRID_SIZE}
          width={GRID_SIZE}
          height={GRID_SIZE}
          fill="#ffffff" // Color gris oscuro
          stroke="#808080" // Borde blanco
          strokeWidth={0.5}
        />
      );
    }
  }

  return (
    <Layer>{gridItems}</Layer>
  );
};


const PerspectiveGrid = () => {

  const {
    practicas,
    practicas_user,
    practicas_course,
    practicas_course_estudiante,
    practicas_user_teacher,
    practica,
    loading,
    error,
    getPracticas,
    getPracticasByCurso,
    getPractica,
    addPractica,
    updatePractica,
    deletePractica,
    clearPractica,
    setLoading,
    getPracticasByEstudiante,
    getPracticasByProfesor,
    getPracticasEstadoByCurso,
  } = useContext(PracticaContext);

  useEffect(() => {
    handleTraerdeBDEstado();
  }, []); // <-- empty dependency array means it will only run once on mount


  const stageRef = React.useRef(null);
  const layerRef = React.useRef(null);


  const [shape, setshape] = useState([]);
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);


  const [selectedId, setSelectedId] = useState(null);
  const [stageData, setStageData] = useState(null);


  // Set the size of the stage
  const stageWidth = window.innerWidth - 20;
  const stageHeight = window.innerHeight - 270;
  console.log(stageWidth, "tamaños", stageHeight);
  // Calculate the vanishing point position
  const vanishingPointX = stageWidth / 2;
  const vanishingPointY = stageHeight / 2;

  // Calculate the square size
  const squareSize = 200;

  // Calculate the projection line length
  const projectionLength = 750;

  // Create the base line
  const baseLine = new Konva.Line({
    points: [0, vanishingPointY, stageWidth, vanishingPointY],
    stroke: 'orange',
    strokeWidth: 2,
  });

  const centerLine = new Konva.Circle({
    x: vanishingPointX,
    y: vanishingPointY,
    stroke: 'red',
    strokeWidth: 2,
    radius: 1,
  });

  // Create the projection lines
  const projectionLines = [];
  const squareCenterX = 0;
  const squareCenterY = 400;
  const squareVertices = [
    { x: squareCenterX, y: squareCenterY },
    { x: squareCenterX + squareSize, y: squareCenterY },
    { x: squareCenterX, y: squareCenterY + squareSize },
    { x: squareCenterX + squareSize, y: squareCenterY + squareSize },
  ];
  for (let i = 0; i < 4; i++) {
    const vertex = squareVertices[i];
    const angle = Math.atan2(vanishingPointY - vertex.y, vanishingPointX - vertex.x);
    const startX = vertex.x;
    const startY = vertex.y;
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;
    const endX = (centerX - startX) * (projectionLength / Math.sqrt(Math.pow(centerX - startX, 2) + Math.pow(centerY - startY, 2))) + startX;
    const endY = (centerY - startY) * (projectionLength / Math.sqrt(Math.pow(centerX - startX, 2) + Math.pow(centerY - startY, 2))) + startY;

    const line = new Konva.Line({
      points: [startX, startY, endX, endY],
      stroke: 'lightblue',
      strokeWidth: 2,
      dash: [10, 5],
    });
    projectionLines.push(line);
  }

  // Create the square
  const square = new Konva.Rect({
    x: 0, // 0,
    y: 400, // stageHeight - squareSize,
    width: squareSize,
    height: squareSize,
    stroke: 'black',
    strokeWidth: 2,
  });



  const handleCreateRect = () => {
    // create rect revisar para que sirva desde importar y deje crear acorde al usuario
    // create rect
    const rect = {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      // fill: Konva.Util.getRandomColor(),
      stroke: Konva.Util.getRandomColor(),
      id: ("r" + rectangles.length).toString(),
      name: 'object',
      type: "rectangle",
    };

    setRectangles((prev) => [...prev, rect]);
  };

  const handleCreateCircle = () => {
    // create rect revisar para que sirva desde importar y deje crear acorde al usuario
    // create rect
    const circle = {
      x: 50,
      y: 50,
      radius: 50,
      // fill: Konva.Util.getRandomColor(),
      stroke: Konva.Util.getRandomColor(),
      id: ("ci" + circles.length).toString(),
      name: 'object',
      type: "circle",
    };

    setCircles((prev) => [...prev, circle]);
  };

  const handleCreateLine = () => {
    const line = {
      x: 50,
      y: 50,
      points: [0, 300, 100, 300],
      stroke: Konva.Util.getRandomColor(),
      id: ("l" + lines.length).toString(),
      name: 'object',
      type: "line",
      strokeWidth: 6,
    };

    setLines((prev) => [...prev, line]);
  };

  const handleCreateLineDash = () => {
    const line = {
      x: 50,
      y: 50,
      points: [0, 300, 100, 300],
      stroke: Konva.Util.getRandomColor(),
      id: ("ld" + lines.length).toString(),
      name: 'object',
      type: "line",
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round',
      dash: [10, 10],
    };

    setLines((prev) => [...prev, line]);
  };



  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleExportJson = () => {
    const stage = stageRef.current;
    const json = stage.toJSON();
    console.log(json);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PracticaCanvasDT.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  // validar importacion con funciones de konva transgormer y key
  const handleImportJson = () => {
    const stage = stageRef.current;

    setStageData(stageJson);
    //const storedPracticaEstado = localStorage.getItem('practica_estado');
    {/*console.log(" practica ", JSON.parse(storedPracticaEstado.toString()))*/ }
    stage.clear();
    const importedJson =
      '{"attrs":{"width":1660,"height":667},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":444,"y":99,"width":100,"height":100,"fill":"#d058eb","id":"0","draggable":true},"className":"Rect"},{"attrs":{"x":349,"y":235,"width":100,"height":100,"fill":"#ecdb6f","id":"1","draggable":true},"className":"Rect"},{"attrs":{"x":49.99999999999999,"y":49.99999999999999,"width":491,"height":99.99999999999997,"fill":"#926a57","id":"2","draggable":true},"className":"Rect"},{"attrs":{"flipEnabled":false},"className":"Transformer"}]}]}';

    const stageJson = JSON.parse(importedJson);
    // PracticaEstado.estado = stageJson;
    // {console.log("IDDDD", PracticaEstado);}
    // updatePractica(PracticaEstado);
    stage.setAttrs(stageJson);
    stage.draw();

    setStageData(stageJson); // <-- setear estado con data importada
  };

  const handleTraerdeBDEstado = () => {
    { console.log("practica bd", localStorage.getItem('practica_estado')); }
    if (localStorage.getItem('practica_estado') !== null) {
      const PracticaEstado = JSON.parse(localStorage.getItem('practica_estado'));
      const stage = stageRef.current;
      //const id = JSON.parse(localStorage.getItem("usuario"))._id;

      // titulo objetivos actividades
      if (PracticaEstado.estado !== null) {
        const estadoJson = JSON.parse(JSON.stringify(PracticaEstado.estado));
        console.log("estado", estadoJson);
        stage.setAttrs(estadoJson);
        stage.draw();
        setStageData(estadoJson); // <-- setear estado con data importada

      }
    } else {
      //no hacer nada
    }
  };

  const handleGuardarBD = () => {
    { console.log("PPPPPP", localStorage.getItem('practica_estado')); }
    if (localStorage.getItem('practica_estado') !== null) {
      const PracticaEstado = JSON.parse(localStorage.getItem('practica_estado'));
      if (PracticaEstado.estado !== null) {
        const stage = stageRef.current;
        const json = stage.toJSON();
        console.log(json);
        const final = JSON.parse(json);
        PracticaEstado.estado = final;
        { console.log("PPPPPractica estaodP", PracticaEstado) }
        updatePractica(PracticaEstado);
        localStorage.setItem('practica_estado', JSON.stringify(PracticaEstado));
        // { console.log("PPPPPP", localStorage.setItem('practica_estado')); }
      }
    } else {
      //no hacer nada
    }
  };

  const renderShapes = (data) => {
    // mapear y renderizar formas desde data
    { console.log(" DATAAAA ", data); }
    const shapes = data.children[0].children;
    // var aux =0;
    { console.log(selectedId," shapesssss ", shapes); }
    return shapes.map((shape) => {
      if (shape.className === "Rect") {
        return (
          <Rectangle
            id={("sh" + 99 + shape.attrs.id).toString()}
            key={("shjey" + 99 + shape.attrs.id).toString()}
          
            shapeProps={shape}
            isSelected={shape.attrs.id === selectedId}
            onSelect={() => {
              setSelectedId(shape.attrs.id);
            }}
            onChange={(newAttrs) => {
              const rects = shapes.slice();
              rects[shape.attrs.id] = newAttrs;
              setshape(rects);
            }}
          />
        );
      }
      //REVISAR ID

      if (shape.className === "Line") {
        return (
          <Linea
            id={("sh" + 99 + shape.attrs.id).toString()}
            key={("shjey" + 99 + shape.attrs.id).toString()}
            shapeProps={shape}
            isSelected={shape.attrs.id === selectedId}
            onSelect={() => {
              setSelectedId(shape.attrs.id);
            }}
            onChange={(newAttrs) => {
              const lineas = shapes.slice();
              lineas[shape.attrs.id] = newAttrs;
              setshape(lineas);
            }}
          />
        );
      }

      if (shape.className === "Circle") {
        return (
          <Circulo
            id={("sh" + 99 + shape.attrs.id).toString()}
            key={("shjey" + 99 + shape.attrs.id).toString()}
            shapeProps={shape}
            isSelected={shape.attrs.id === selectedId}
            onSelect={() => {
              setSelectedId(shape.attrs.id);
            }}
            onChange={(newAttrs) => {
             console.log(" on change circle", shape.attrs.id);
              const updatedCircles = shapes.slice();
              updatedCircles[shape.attrs.id] = newAttrs;
              setshape(updatedCircles);
            }}
          />
        );
      }
  
      // aux = aux +1;
    });
  };

  // Add the shapes to the layer
  React.useEffect(() => {
    if (layerRef.current) {
      // layerRef.current.destroyChildren();
      //layerRef.current.add(baseLine);
      //layerRef.current.add(centerLine);
      // projectionLines.forEach((line) => layerRef.current.add(line));
      //layerRef.current.add(square);
      layerRef.current.draw();
    }
  }, [baseLine, projectionLines, square, layerRef]);

  const [showGrid, setShowGrid] = useState(false);

  const toggleGridVisibility = () => {
    setShowGrid(!showGrid);
  };


  return (
    <div>
      <Container style={{ position: "sticky", zIndex: 2, bottom: 10, padding: 60 }}>
        <Row>
          <Col className="d-flex justify-content-start">
            <div>
              <Button variant="primary" onClick={handleCreateRect}>Crear Rectangulo</Button>
              <Button variant="primary" onClick={handleCreateLine}>Crear Linea</Button>
              <Button variant="primary" onClick={handleCreateLineDash}>Crear Linea Punteada</Button>
              <Button variant="primary" onClick={handleCreateCircle}>Crear Circulo</Button>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <div>
              <Button variant="secondary" onClick={handleExportJson}>Exportar a JSON</Button>
              <Button variant="secondary" onClick={handleImportJson}>Importar desde JSON</Button>
              <Button variant="primary" onClick={handleGuardarBD}>Guardar Cambios</Button>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="text-center">
            <Button
              variant="success"
              onClick={() => {
                if (layerRef.current) {
                  layerRef.current.destroyChildren();
                  layerRef.current.add(baseLine);
                  layerRef.current.add(centerLine);
                  projectionLines.forEach((line) => layerRef.current.add(line));
                  layerRef.current.add(square);
                  layerRef.current.draw();
                }
              }}
            >
              Ver Ejemplo
            </Button>
            <Button
              variant="info"
              onClick={() => {
                if (layerRef.current) {
                  layerRef.current.destroyChildren();
                  layerRef.current.add(baseLine);
                  layerRef.current.add(centerLine);
                  layerRef.current.draw();
                }
              }}
            >
              Linea Base
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (layerRef.current) {
                  layerRef.current.destroyChildren();
                  layerRef.current.draw();
                }
              }}
            >
              Limpiar todo
            </Button>
            <Button variant="dark" onClick={toggleGridVisibility}>Grid</Button>
          </Col>
        </Row>
      </Container>
      <Stage width={stageWidth} height={stageHeight} ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{ border: '1px solid grey', margin: '10px' }}
      >

        {showGrid && <GridBackground />}
        {/* Aquí puedes agregar otros elementos de Konva */}
        <Layer ref={layerRef} >
          {/* <Text text="Create Rect" onClick={handleCreateRect} /> */}
          {console.log("STAGEDATA", stageData)}
          {stageData && renderShapes(stageData)}

          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={rect.id}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  setSelectedId(rect.id);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />


            );
          })}

          {lines.map((line, i) => {
            return (
              <Linea
                key={line.id}
                shapeProps={line}
                isSelected={line.id === selectedId}
                onSelect={() => {
                  setSelectedId(line.id);
                }}
                onChange={(newAttrs) => {
                  const lineas = lines.slice();
                  lineas[i] = newAttrs;
                  setLines(lineas);
                }}
              />
            );


          })}
          {console.log(shape," CIRCULOS", circles)}
          {circles.map((circleProps) => (
            <Circulo
              key={circleProps.id}
              shapeProps={circleProps}
              isSelected={circleProps.id === selectedId}
              onSelect={() => setSelectedId(circleProps.id)}
              onChange={(newAttrs) => {
                const updatedCircles = circles.slice();
                const index = updatedCircles.findIndex(c => c.id === circleProps.id);
                updatedCircles[index] = newAttrs;
                setCircles(updatedCircles);
                
              }}
            />
          ))}

        </Layer>
      </Stage>
      <div style={{ position: "fixed", zIndex: 2, bottom: 10, padding: 10 }}>
        <SidebarInfo />
      </div>
      <div style={{ position: "fixed", zIndex: 2, bottom: 0, right: 0, padding: 10, fontFamily: 'monospace' }}>
        <h1> Canvas de Dibujo Técnico</h1>
      </div>
    </div>
  );
};

export default PerspectiveGrid;