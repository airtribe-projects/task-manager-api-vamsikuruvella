
# Task Manager API

A simple RESTful API for managing tasks using Node.js and Express.  
Supports task creation, retrieval, filtering, sorting, updating, and deletion.

## 🛠️ Features

- Create new tasks
- Retrieve all tasks
- Filter tasks by completion status
- Sort tasks by creation date
- Filter tasks by priority (`low`, `medium`, `high`)
- Update and delete tasks

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api

# Install dependencies
npm install
```

### Running the Server

```bash
# Start the server
node app.js
```

> 📌 Server runs on **http://localhost:3000** or **assigned port in Codespaces**.

---

## 📚 API Endpoints

### 🟢 Create a Task

**POST** `/tasks`

- **Body Parameters** (JSON):
```json
{
  "title": "Task Title",
  "description": "Details about the task",
  "completed": false,
  "priority": "medium"
}
```

- **Success Response**:
```json
{
  "id": 3,
  "title": "...",
  "description": "...",
  "completed": false,
  "priority": "medium",
  "date": "2025-05-02"
}
```

---

### 🔵 Get All Tasks

**GET** `/tasks`

- **Optional Query Parameter**:
  - `completed=true`
  - `completed=false`

- **Response**: Sorted list of tasks by `date` (ascending)

---

### 🔍 Get Task by ID

**GET** `/tasks/:id`

- Example: `/tasks/2`

- **Response**:
```json
{
  "id": 2,
  "title": "Create POST",
  ...
}
```

---

### 🔶 Get Tasks by Priority

**GET** `/tasks/priority/:level`

- Example: `/tasks/priority/medium`

- `:level` can be `low`, `medium`, or `high`.

---

### ✏️ Update Task

**PUT** `/tasks/:id`

- **Body Parameters**: Same as POST
- Preserves original task `date`.

---

### ❌ Delete Task

**DELETE** `/tasks/:id`

- Deletes the task with the given ID.

---

## 🧪 Testing the API

You can test the API using tools like:

- [Postman](https://www.postman.com/)
- [curl](https://curl.se/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)

Example using curl:
```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Test","description":"Try task","completed":false,"priority":"low"}'
```

---

## 📄 Sample Task Object Format

```json
{
  "id": 0,
  "title": "Sample Task",
  "description": "Describe the task",
  "completed": false,
  "priority": "low",
  "date": "YYYY-MM-DD"
}
```

---

## 📦 License

MIT License

---

## 👨‍💻 Author

[Vamsi Kuruvella](https://github.com/your-username)
