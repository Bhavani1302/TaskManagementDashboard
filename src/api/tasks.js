export const fetchTasks = async () => {
  const res = await fetch("/.netlify/functions/getTasks");
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const addTask = async (task) => {
  const res = await fetch("/.netlify/functions/addTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, updatedTask) => {
  const res = await fetch("/.netlify/functions/updateTask", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updatedTask }),
  });
  return res.json();
};
