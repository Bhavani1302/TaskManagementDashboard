import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

const TaskColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
  ref={setNodeRef}
  style={{
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "500px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "600",
      color: "#374151",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "8px",
      marginBottom: "8px",
    }}
  >
    {title}
  </h2>

  {tasks.map((task) => (
  <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} status={id} />
))}
    </div>
  );
};

export default TaskColumn;
