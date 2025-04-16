// TaskItem.jsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskItem = ({ id, title, description,status }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const getBgColor = () => {
    switch (status) {
      case "To Do":
        return "#DBEAFE"; // light blue
      case "In Progress":
        return "#FEF3C7"; // light yellow
      case "Done":
        return "#D1FAE5"; // light green
      default:
        return "#ffffff";
    }
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        backgroundColor: getBgColor(),
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        cursor: "grab",
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
        transition: "transform 0.2s ease",
        borderLeft: "4px solid #3b82f6",
      }}
    >
      <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "6px", color: "#111827" }}>
        {title}
      </h4>
      {description && (
        <p style={{ fontSize: "14px", color: "#374151" }}>{description}</p>
      )}
    </div>
  );
};

export default TaskItem;
