const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");

//load in mongoose moderls
// can also import each individual const and pull the files.
const { List, Task } = require("./db/models");

//load middleware
app.use(express.json());

// route handling here:

//
// LIST ROUTES:
//

// GET /lists -> get all lists
app.get("/lists", (req, res) => {
  // return an array of all the lists in the database:
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

// POST /lists -> add a new list to the DB
app.post("/lists", (req, res) => {
  // create a new list and return the new list document back to user (incl. ID)
  //   list information will be passed in via the JSON req. body)
  let title = req.body.title;

  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    //the full list document is returned
    res.send(listDoc);
  });
});

// PATCH /lists/:id -> edit a list
app.patch("/lists/:id", (req, res) => {
  // edit a specified list item and return it to the user
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

//DELETE /lists/:id -> delete a list
app.delete("/lists/:id", (req, res) => {
  // delete a list item of a certain id.
  List.findByIdAndRemove({
    _id: req.params.id,
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

//
//TASK ROUTES:
//

//GET /lists/:listId/tasks
// Purpose GET all tasks in a specified list
app.get("./lists/:listId/tasks", (req, res) => {
  //we want to return all tasks that belong to a specific list (specified by listId)
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});

//POST /lists/:listId/tasks
//purpose: POST a new task in specified list
app.post("/lists/:listId/tasks", (req, res) => {
  //we want to create a new task in the list specified by list ID
  let newTask = new Task({
    _listId: req.params.listId,
    title: req.body.title,
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
});

// 3000 is where our api backend will be
app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
