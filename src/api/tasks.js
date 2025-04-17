export const fetchTasks = async () => {
  const res = await fetch("/.netlify/functions/getTasks");
  return res.json();
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
