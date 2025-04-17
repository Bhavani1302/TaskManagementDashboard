const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const newTask = JSON.parse(event.body);
  const tmpPath    = path.join("/tmp", "db.json");
  const bundlePath = path.join(__dirname, "db.json");
  const filePath   = fs.existsSync(tmpPath) ? tmpPath : bundlePath;

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const json     = JSON.parse(fileData);

    newTask.id = Date.now().toString();
    json.tasks.push(newTask);

    fs.writeFileSync(tmpPath, JSON.stringify(json, null, 2));

    return { statusCode: 200, body: JSON.stringify(newTask) };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to add task", error: err }),
    };
  }
};
