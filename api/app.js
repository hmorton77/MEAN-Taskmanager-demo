const express = require("express");
const app = express();

// route handling here:

// list routes:
// GET /lists -> get all lists
app.get("/lists", (req, res) => {
  // return an array of all the lists in the database:
});

// POST /lists -> add a new list to the DB
app.post("/lists", (req, res) => {
  // create a new list and return the new list document back to user (incl. ID)
  //   list information will be passed in via the JSON req. body)
});

// PATCH /lists/:id -> edit a list
app.patch("/lists/:id", (req, res) => {
  // edit a specified list item and return it to the user
});

//DELETE /lists/:id -> delete a list
app.delete("/lists/:id", (req, res) => {
  // delete a list item of a certain id.
});

// 3000 is where our api backend will be
app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
