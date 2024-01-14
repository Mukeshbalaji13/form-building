// DraggableComponent.jsx
import React from "react";
import { useDrag } from "react-dnd";

export function DraggableComponent(props) {
  const { data } = props;

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: data,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const getStyle = () => ({
    backgroundColor: isDragging ? "green" : "#BFD7ED",
  });

  return (
    <div ref={drag} className="navbar">
      <div className="options"style={getStyle()}>{data.name}</div>
    </div>
  );
}
