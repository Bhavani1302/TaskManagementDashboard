const fs = require("fs");
const path = require("path");

exports.handler = async () => {
const filePath = path.resolve(__dirname, "db.json"); // Ensure this points to the correct location
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(json.tasks),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to load tasks", error }),
    };
  }
};
