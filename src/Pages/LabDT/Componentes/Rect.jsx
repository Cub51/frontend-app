/*import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Transformer, Text, Shape, Line, Circle } from "react-konva";


const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [type, setType] = useState("rectangle");


  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };


  const handleTransformEnd = (e) => {
    const node = shapeRef.current;

    if (type === "rectangle") {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      node.scaleX(1);
      node.scaleY(1);

      onChange({
        ...shapeProps,
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(node.height() * scaleY),
      });
    } else if (type === "line") {
      onChange({
        ...shapeProps,
        points: node.points(),
      });
    } else if (type === "circle") {
      onChange({
        ...shapeProps,
        radius: node.radius(),
      });
    }
  };

  const drawShape = (context, shape) => {
    console.log("drawShape");
    if (type === "rectangle") {
      console.log("rectangle DRAW");
      context.beginPath();
      context.rect(0, 0, 100, 100);
      context.fillStrokeShape(shape);
    } else if (type === "line") {
      console.log("line DRAW");
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(100, 100);
      context.stroke();
    } else if (type === "circle") {
      context.beginPath();
      context.arc(50, 50, 50, 0, 2 * Math.PI);
      context.fillStrokeShape(shape);
    }
  };
  return (
    <React.Fragment>
      <Shape
        name={'object'}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        sceneFunc={(context, shape) => {
          drawShape(context, shape);
        }}
      >
       

      </Shape>
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
*/



import React, { useState } from "react";
import { Stage, Layer, Rect, Transformer, Text, Shape } from "react-konva";


const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [type, setType] = useState("rectangle");


  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

 
  return (
    <React.Fragment>
      <Rect
        name={'object'}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
