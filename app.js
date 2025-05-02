const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;
// let tasksData=require()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let fileData;
let length;
const filePath=path.join(__dirname, 'task.json');
fs.readFile(filePath,'UTF-8',(err,data)=>{
    if(err){
        console.error('Error reading file:', err);
        fileData={"tasks":"error"};
    }
    fileData=JSON.parse(data);
    length=fileData["tasks"].length;
})

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});

app.post("/tasks",(req,res)=>{
    
        const data = req.body; 
       
    
        if (!data || typeof data !== 'object' || !data.title) {
            return res.status(400).json({ error: 'Invalid data format' });
        }
        fileData['tasks'].push({'id':length+1,'title':data.title,'description':data.description?data.description:false,"completed":data.completed?data.completed:""})
        length+=1;
        console.log("Received:", data);
        fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            console.log('File written successfully!');
        })
        res.status(200).send("Valid JSON received");
});

app.put("/tasks/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    if (id < 1 || id > length) {
        return res.status(400).json({ error: `Task ID ${id} is out of bounds.` });
    }

    const newTask = req.body;
    if (!newTask.title) {
        return res.status(400).json({ error: "Title is required for PUT." });
    }

    fileData.tasks[id - 1] = {
        id: id,
        title: newTask.title,
        description: newTask.description || "",
        completed: newTask.completed || false
    };

    fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf8', (err) => {
        if (err) return res.status(500).send("Error writing file");
        res.json({ message: "Task updated successfully" });
    });
});


app.patch("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 1 || id > length) {
        return res.status(400).json({ error: `Task ID ${id} is out of bounds.` });
    }

    const updates = req.body;
    const task = fileData.tasks[id - 1];

    // Apply only provided fields
    if (updates.title !== undefined) task.title = updates.title;
    if (updates.description !== undefined) task.description = updates.description;
    if (updates.completed !== undefined) task.completed = updates.completed;

    fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf8', (err) => {
        if (err) return res.status(500).send("Error writing file");
        res.json({ message: "Task patched successfully" });
    });
});



app.get("/tasks/:id" ,(req,res)=>{
    let id = parseInt(req.params.id); 
    console.log("line 21 "+id);
    if(id<1 || id>length){
        res.status(400).send({"error":`ID ${id} is out of bound`});
    }
    res.status(200).json(fileData["tasks"][id-1]);
    

    // res.json({"id":1,"class":1});
});

app.get("/tasks",(req,res)=>{
    res.json(fileData);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;