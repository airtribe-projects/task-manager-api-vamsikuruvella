const express = require("express");
const app = express();

app.use(express.json());
let sample={
  id: 1,
  title: "Example Task title",
  description: "Describe Task implemented",
  completed: "true or false",
  priority:"low or medium or high",
};

let tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    date:"2025-05-03",
    priority:"low",
  },
  {
    id: 2,
    title: "Create POST",
    description: "Write Post function",
    completed: true,
    date:"2025-05-02",
    priority:"medium",
  },
];

let nextId = 3;

// Helper: validate task data
function isValidTask(task) {
  return (
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.priority==="string"
  );
}

// POST /tasks
app.post("/tasks", (req, res) => {
  const task = req.body;
  task['date']=new Date().toISOString().split("T0")[0];
  if (!isValidTask(task)) return res.status(400).send();

  const newTask = { id: nextId++, ...task };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks
app.get("/tasks", (req, res) => {
  const  completed  = req.query.completed;
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  if(completed==="true"){
    return res.json(tasks.filter(task => task.completed === true))
  }else if(completed==="false"){
    return res.json(tasks.filter(task => task.completed === false))
  }
  res.json(tasks);
});

// GET /tasks/:id
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json(sample);
  res.json(task);
});

//GET /tasks/priority/:level
app.get("/tasks/priority/:level",(req,res)=>{
  const level=req.params.level;
  if(level==="low" || level==="medium" || level==="high"){
    res.json(tasks.filter(task=>task.priority===level));
  }
  else{
    res.status(404).json(sample);
  }
})

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json(sample);

  const updatedTask = req.body;
  // updatedTask["date"]=Date().now
  if (!isValidTask(updatedTask)) return res.status(400).json(sample);

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

app.listen(3000,()=>{
  console.log("Running Server on Port 3000");
})
module.exports = app;
