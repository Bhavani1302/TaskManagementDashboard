const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.join(__dirname, '..', 'db.json');
  const tasks = JSON.parse(fs.readFileSync(filePath));

  // Example: GET /tasks
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  }

  // Example: POST /tasks (for adding new tasks)
  if (event.httpMethod === 'POST') {
    const newTask = JSON.parse(event.body);
    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks));

    return {
      statusCode: 200,
      body: JSON.stringify(newTask),
    };
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
