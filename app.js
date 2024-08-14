const express = require("express");
const { getEndpoints } = require("./controllers/api.controller");
const { getUsers, addUser, loginUser, deleteUser, getUserInfo, logout } = require("./controllers/users.controller");
// const { authenticateUser } = require('./middleware/authenticateUser');
// const { checkAdmin } = require('./middleware/checkAdmin');
const {
  handleCustomErrors,
  handle500errors,
} = require("./controllers/errors.controller");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Routing
app.get("/", getEndpoints);
app.get("/api", getEndpoints);
app.get("/users", getUsers);
app.post("/users", addUser);
app.post("/users/login", loginUser);
app.get("/users/authenticate", getUserInfo);
app.post("/users/logout", logout)
// app.post("/admin/users", authenticateUser, checkAdmin, createAdminUser);
app.delete("/users/:id", deleteUser);

// Error-handling
app.use(handleCustomErrors);
app.use(handle500errors);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Please check your path is correct." });
});

module.exports = app;
