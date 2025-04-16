const API_URL = "http://localhost:3001/tasks"; 

// Fetch tasks from API
export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// Add new task via API
export const addTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

// Update task via API
export const updateTask = async (id, updatedTask) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return res.json();
};
