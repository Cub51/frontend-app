
import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Transformer, Text, Shape, Line } from "react-konva";

const Linea = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);


    return (
        <React.Fragment>
            <Line
                name={'object'}
                ref={shapeRef}
                
                {...shapeProps}
                strokeWidth={shapeProps.strokeWidth}
                draggable
                
                onClick={(e) => {
                    onSelect();
                  }}
                  onDragEnd={
                    (e) => {
                        onChange({
                            ...shapeProps,
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }
                }

                onTransformEnd={(e) => {
                   
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
                        points: node.points().map((point, idl) => {
                            if (idl % 2 === 0) {
                                return point * scaleX;
                            } else {
                                return point * scaleY;
                            }
                        }),
                    });
                }}
            />

            {isSelected && (
                  <Transformer
                  ref={trRef}
                  rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
                  keepRatio={false}
                  flipEnabled={false}
                  onChange={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
            
                    node.scaleX(1);
                    node.scaleY(1);
            
                    onChange({
                      ...node.attrs(),
                      x: node.x(),
                      y: node.y(),
                      points: node.points(),
                      // set minimal value
                      scaleX: Math.max(0.1, scaleX),
                      scaleY: Math.max(0.1, scaleY),
                    });
                  }}
                  onSelect={onSelect}
                />
            )}
        </React.Fragment>
    );
};

export default Linea;
