import React, { useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva";

const CircleComponent = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Circle
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
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        radius: Math.max(node.width() * scaleX, node.height() * scaleY) / 2,
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        const limitSize = Math.max(newBox.width, newBox.height);
                        if (limitSize < 10) {
                            return oldBox;
                        }
                        return {
                            ...newBox,
                            width: limitSize,
                            height: limitSize,
                        };
                    }}
                />
            )}
        </>
    );
};

export default CircleComponent;