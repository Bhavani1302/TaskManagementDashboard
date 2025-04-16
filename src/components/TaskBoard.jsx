import React, { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import { v4 as uuidv4 } from "uuid";
import { fetchTasks, addTask, updateTask } from "../api/tasks"; // API methods

const defaultColumns = ["To Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [columns] = useState(defaultColumns);
  const [tasks, setTasks] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false); // State to show/hide task modal
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks(); // Fetch tasks from API
      const tasksByColumn = data.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
      }, {});
      setTasks(tasksByColumn);
    };

    loadTasks();
  }, []);

  const addNewTask = async () => {
    if (newTask.title) {
      const taskData = { ...newTask, id: uuidv4() };
      const createdTask = await addTask(taskData); // Save task using API

      setTasks((prevTasks) => ({
        ...prevTasks,
        [createdTask.status]: [...(prevTasks[createdTask.status] || []), createdTask],
      }));
      setShowTaskModal(false); // Close modal after task is added
      setNewTask({ title: "", description: "", status: "To Do" }); // Reset form
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = Object.keys(tasks).find((key) =>
      tasks[key].find((task) => task.id === active.id)
    );
    const toColumn = over.id;

    if (fromColumn === toColumn) return;

    const taskToMove = tasks[fromColumn].find((task) => task.id === active.id);
    const updatedTask = { ...taskToMove, status: toColumn };

    await updateTask(updatedTask.id, updatedTask); // Update task status in API

    setTasks((prevTasks) => ({
      ...prevTasks,
      [fromColumn]: prevTasks[fromColumn].filter((task) => task.id !== active.id),
      [toColumn]: [...(prevTasks[toColumn] || []), updatedTask],
    }));
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{fontFamily:'initial'}}>Task Management Dashboard</h1>
      <button
        onClick={() => setShowTaskModal(true)}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          borderRadius: "4px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          margin: "16px",
        }}
      >
         Add New Task
      </button>

      {showTaskModal && (
        <div style={{ padding: "20px", backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "4px", maxWidth: "400px", margin: "auto" }}>
          <h3>Create New Task</h3>
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px" }}
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px" }}
          />
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px" }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={addNewTask} style={{ backgroundColor: "blue", color: "white", padding: "8px 16px", borderRadius: "4px", marginTop: "10px" }}>
            Add Task
          </button>
        </div>
      )}

<DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    padding: "32px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    maxWidth: "1280px",
    margin: "0 auto",
    boxSizing: "border-box",
  }}
>
    {columns.map((columnKey) => (
      <TaskColumn
        key={columnKey}
        id={columnKey}
        title={columnKey}
        tasks={tasks[columnKey] || []}
      />
    ))}
  </div>
</DndContext>
    </div>
  );
};

export default TaskBoard;
