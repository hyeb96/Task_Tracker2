const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv/config");
const app = express();
const ejs = require('ejs');

// const path = require('path');
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to database 
mongoose.connect('mongodb+srv://hyeb96:Sm17emina@cluster0.yyfegbj.mongodb.net/task-tracker', { useNewUrlParser: true }, { useUnifiedTopology: true })

//create schema 
const taskSchema = {
    task: String
}

//create model
const Task = mongoose.model("task", taskSchema)

app.post("/tasks", (req, res) => {
    let newTask = new Task({
        task: req.body.content
    });
    newTask.save();
    res.redirect('/tasks');
})
// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.get('/tasks', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));
    Task.find({}, function (err, tasks) {
        res.render('index', {
            taskList: tasks
        })
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ${PORT}')
});