# 📝 Task Manager API

A simple RESTful API built with **Express.js** to manage your tasks. You can create, read, update, delete, filter, and sort tasks with ease.

## 🚀 Features

* Add new tasks with a title, description, completion status, and priority.
* Get all tasks, or filter by:

  * ✅ Completion status (`true` or `false`)
  * 🕽 Priority level (`low`, `medium`, `high`)
* Sort tasks by creation date.
* Update or delete existing tasks.

## 📆 Sample Task Structure

```json
{
  "id": 1,
  "title": "Example Task title",
  "description": "Describe Task implemented",
  "completed": true,
  "date": "2025-05-02",
  "priority": "low"
}
```

## 📡 API Endpoints

### ➕ Create a Task

```
POST /tasks
```

**Request Body:**

```json
{
  "title": "Write documentation",
  "description": "Add README.md",
  "completed": false,
  "priority": "medium"
}
```

### 📥 Get All Tasks

```
GET /tasks
```

**Query Parameters (Optional):**

* `?completed=true` – Only show completed tasks
* `?completed=false` – Only show incomplete tasks

Tasks are sorted by their creation date (oldest first).

### 🎯 Get a Task by ID

```
GET /tasks/:id
```

### 🌺 Get Tasks by Priority

```
GET /tasks/priority/:level
```

* `:level` can be `low`, `medium`, or `high`

### ✏️ Update a Task

```
PUT /tasks/:id
```

**Request Body:**

Same as task creation body.

### ❌ Delete a Task

```
DELETE /tasks/:id
```

## 🚲 Tech Stack

* **Node.js**
* **Express.js**

## ▶️ Run the Server

```bash
node app.js
```

Server runs at:

```
http://localhost:3000
```

Or on your Codespace public port if you're using GitHub Codespaces.
