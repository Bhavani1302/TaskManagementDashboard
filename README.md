# ✅ Task Management Dashboard

This is a **Task Management Dashboard** designed to help users manage their tasks efficiently using a clean and responsive **Kanban board** layout. Built with **React** and powered by **@dnd-kit** for seamless drag-and-drop, this project also includes a **mock REST API (json-server)** to persist tasks across sessions.

Users can add tasks, view them under appropriate statuses (To Do, In Progress, Done), and update their statuses through a drag-and-drop interface.

---

## 🌟 Key Features

- ✅ **Kanban Board Interface**
  - Organized into 3 columns: **To Do**, **In Progress**, and **Done**
  - Responsive and clean UI for better task visibility

- ➕ **Add New Tasks**
  - Modal form to enter task title, optional description, and select initial status
  - Automatically rendered in the selected column
  - Task data is saved via a POST API call

- 🔄 **Drag & Drop Support**
  - Smooth drag-and-drop of tasks between columns using `@dnd-kit/core`
  - Automatically updates the task's status both in the UI and backend

- 💾 **Persistent Data**
  - All tasks are stored and updated via API calls
  - Uses `json-server` as a mock backend for local development

- 🖥️ **Fully Responsive**
  - Optimized for both desktop and mobile views

---

## 🚀 Getting Started

Follow the instructions below to run the project locally.

### 🔧 Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- `json-server` installed globally
```bash
npm install -g json-server

📦 Installation
Clone the repository
git clone https://github.com/YOUR_USERNAME/TaskManagementDashboard.git
cd TaskManagementDashboard
Install frontend dependencies

npm install
Start the mock backend (json-server)

▶️ Start Commands
Here’s a quick reference of commands to run the project:

bash
Copy
Edit
# Start the mock API server
json-server --watch db.json --port 3001

# Start the frontend React app
npm start
