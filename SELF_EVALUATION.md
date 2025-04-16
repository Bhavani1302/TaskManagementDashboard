📄 Self-Evaluation

📝 Summary
This project is a Task Management Dashboard developed using React with drag-and-drop functionality via @dnd-kit and a mock REST API (json-server) to persist tasks. It follows a Kanban-style layout with three columns — To Do, In Progress, and Done.

I was able to implement the core features successfully: fetching tasks from an API, adding new tasks via a modal form, dragging and dropping between columns, and persisting status updates. The UI is also responsive and clean, designed for ease of use on both desktop and mobile.

🧠 Self-Criticism

While the core logic works fine, some areas could have been optimized:

State management is handled with simple useState and useEffect — could be more efficient with useReducer or libraries like Zustand or Redux.

The drag-and-drop experience could be enhanced with animations or overlays.

🔧 Improvements
If I had more time:

I’d refactor code to separate logic into custom hooks for better reusability.

Add task editing, due dates, and search/filter functionality.

💻 Technology Rating (Out of 10)
out of 10 i would rate the technology used in this project as 8/10.
