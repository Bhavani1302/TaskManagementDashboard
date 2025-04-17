const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  console.log("📂 Handler __dirname:", __dirname);
  try {
    console.log("🔍 Files in this folder:", fs.readdirSync(__dirname));
  } catch (e) {
    console.error("❌ Could not list dir:", e);
  }

  const filePath = path.resolve(__dirname, "db.json");
  console.log("🔧 Resolved filePath:", filePath); // Ensure this points to the correct location
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
