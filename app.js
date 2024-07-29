const express = require("express");
const { getEndpoints } = require("./controllers/api.controller");
const {getUsers} = require("./controllers/users.controller")
const {
  handleCustomErrors,
  handle500errors,
} = require("./controllers/errors.controller");

const app = express();
app.use(express.json());

// Routing
app.get("/", getEndpoints);
app.get("/api", getEndpoints);

app.get("/users", getUsers)

// Error-handling
app.use(handleCustomErrors);
app.use(handle500errors);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Please check your path is correct." });
});

module.exports = app;
