const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const newTask = JSON.parse(event.body);
  const filePath = path.resolve(__dirname, "../../db.json");
  console.log("Resolved file path:", filePath);
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileData);

    newTask.id = Date.now().toString();
    json.tasks.push(newTask);

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(newTask),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to add task", error: err }),
    };
  }
};
