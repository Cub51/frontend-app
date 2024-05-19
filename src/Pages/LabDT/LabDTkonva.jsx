
import React, { useState } from 'react';
import Rectangle from "./Componentes/Rect";
import Linea from "./Componentes/Linea";
import Konva from "konva";
import SidebarInfo from "./SideBar/SideBar";
import { Stage, Layer, Transformer, Rect, Circle, Ellipse, Line, Image, Text, TextPath, Star, Label, RegularPolygon } from 'react-konva';
const initialRectangles = ([]);
const GRID_SIZE =  19; // Aproximadamente  5mm en pantallas con DPI estándar

const GridBackground = () => {
  const gridItems = [];

  // Calcular el número de filas y columnas basándose en el tamaño de la ventana
  const numRows = Math.ceil(window.innerHeight / GRID_SIZE) +  1;
  const numCols = Math.ceil(window.innerWidth / GRID_SIZE) +  1;

  for (let row =  0; row < numRows; row++) {
    for (let col =  0; col < numCols; col++) {
      gridItems.push(
        <Rect
          key={`${row}-${col}`}
          x={col * GRID_SIZE}
          y={row * GRID_SIZE}
          width={GRID_SIZE}
          height={GRID_SIZE}
          fill="#808080" // Color gris oscuro
          stroke="#ffffff" // Borde blanco
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
  const stageRef = React.useRef(null);
  const layerRef = React.useRef(null);

  const [rectangles, setRectangles] = useState(initialRectangles);
  const [lines, setLines] = useState([]);


  const [selectedId, setSelectedId] = useState(null);
  const [stageData, setStageData] = useState(null);


  // Set the size of the stage
  const stageWidth = window.innerWidth - 20;
  const stageHeight = window.innerHeight - 200;

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
      id: rectangles.length.toString(),
      name: 'object',
      type: "rectangle",
    };

    setRectangles((prev) => [...prev, rect]);
  };

  const handleCreateLine = () => {
    const line = {
      x: 50,
      y: 50,
      points: [0, 300, 100, 300],
      stroke: Konva.Util.getRandomColor(),
      id: lines.length.toString(),
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
      id: lines.length.toString(),
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
  };

  // validar importacion con funciones de konva transgormer y key
  const handleImportJson = () => {
    const stage = stageRef.current;
    stage.clear();

    const importedJson =
      '{"attrs":{"width":1027,"height":730},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":444,"y":99,"width":100,"height":100,"fill":"#d058eb","id":"0","draggable":true},"className":"Rect"},{"attrs":{"x":349,"y":235,"width":100,"height":100,"fill":"#ecdb6f","id":"1","draggable":true},"className":"Rect"},{"attrs":{"x":49.99999999999999,"y":49.99999999999999,"width":491,"height":99.99999999999997,"fill":"#926a57","id":"2","draggable":true},"className":"Rect"},{"attrs":{"flipEnabled":false},"className":"Transformer"}]}]}';

    const stageJson = JSON.parse(importedJson);
    stage.setAttrs(stageJson);
    stage.draw();

    setStageData(stageJson); // <-- setear estado con data importada
  };

  const renderShapes = (data) => {
    // mapear y renderizar formas desde data
    const shapes = data.children[0].children;
    return shapes.map((shape) => {
      return (
        <Rect
          id={rectangles.length.toString()}
          key={rectangles.length.toString()}
          x={shape.attrs.x}
          y={shape.attrs.y}
          width={shape.attrs.width}
          height={shape.attrs.height}
          fill={shape.attrs.fill}
          draggable={shape.attrs.draggable}

        />
      );
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
       <div >
        <button onClick={handleCreateRect}>Create Rect</button>
        <button onClick={handleCreateLine}>Create Line</button>
        <button onClick={handleExportJson}>Export JSON</button>
        <button onClick={handleImportJson}>import JSON</button>
        <button onClick={handleCreateLineDash}>Create Line Dash</button>
      </div>
      <button onClick={() => {
        if (layerRef.current) {
          layerRef.current.destroyChildren();
          layerRef.current.add(baseLine);
          layerRef.current.add(centerLine);
          projectionLines.forEach((line) => layerRef.current.add(line));
          layerRef.current.add(square);
          layerRef.current.draw();
        }
      }
      }>View Example</button>
      <button onClick={() => {
        if (layerRef.current) {
          layerRef.current.destroyChildren();
          layerRef.current.add(baseLine);
          layerRef.current.add(centerLine);
          layerRef.current.draw();
        }
      }
      }>Base Line</button>
      <button onClick={() => {
        if (layerRef.current) {
          layerRef.current.destroyChildren();
          layerRef.current.draw();
        }
      }
      }>Clear All</button>
      <button onClick={toggleGridVisibility}>Dark Grid</button>

      <Stage width={stageWidth} height={stageHeight} ref={stageRef}         
      onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{ border: '1px solid grey' , margin: '10px'}}
        >

      {showGrid && <GridBackground />}
        {/* Aquí puedes agregar otros elementos de Konva */}
        <Layer ref={layerRef} >
           {/* <Text text="Create Rect" onClick={handleCreateRect} /> */}
           {stageData && renderShapes(stageData)}
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
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
                key={i}
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

          </Layer>
      </Stage>
      <div style={{ position: "fixed", zIndex: 2, bottom: 0, padding: 10 }}>
                    <SidebarInfo/>
                </div>
                <div style={{ position: "fixed", zIndex: 2, bottom: 0, right: 0, padding: 10,  fontFamily: 'monospace'}}>
                    <h1> Canvas de Dibujo Técnico</h1>
                    </div>
    </div>
  );
};

export default PerspectiveGrid;