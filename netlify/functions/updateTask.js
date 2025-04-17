const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "PUT") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const updatedTask = JSON.parse(event.body);
  const filePath = path.resolve(__dirname, "db.json");

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileData);

    const taskIndex = json.tasks.findIndex((t) => t.id === updatedTask.id);
    if (taskIndex === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    json.tasks[taskIndex] = { ...json.tasks[taskIndex], ...updatedTask };

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(json.tasks[taskIndex]),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update task", error: err }),
    };
  }
};
