const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
];

let nextId = 2;

// Helper: validate task data
function isValidTask(task) {
  return (
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    typeof task.completed === "boolean"
  );
}

// POST /tasks
app.post("/tasks", (req, res) => {
  const task = req.body;
  if (!isValidTask(task)) return res.status(400).send();

  const newTask = { id: nextId++, ...task };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).send();
  res.json(task);
});

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).send();

  const updatedTask = req.body;
  if (!isValidTask(updatedTask)) return res.status(400).send();

  tasks[index] = { id: tasks[index].id, ...updatedTask };
  res.json(tasks[index]);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).send();

  tasks.splice(index, 1);
  res.status(200).send();
});

module.exports = app;
