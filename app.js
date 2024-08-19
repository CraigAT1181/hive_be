const express = require("express");
const multer = require('multer');
const { getEndpoints } = require("./controllers/api.controller");
const { getUsers, addUser, loginUser, deleteUser, getUserInfo, logout } = require("./controllers/users.controller");
// const { authenticateUser } = require('./middleware/authenticateUser');
// const { checkAdmin } = require('./middleware/checkAdmin');
const {
  handleCustomErrors,
  handle500errors,
} = require("./controllers/errors.controller");

const cors = require("cors");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors());

// Routing
app.get("/", getEndpoints);
app.get("/api", getEndpoints);
app.get("/users", getUsers);
app.post("/users", upload.single('profile-pic'), addUser);
app.post("/users/login", loginUser);
app.get("/users/authenticate", getUserInfo);
app.post("/users/logout", logout)
app.delete("/users/:user_id", deleteUser);
// app.post("/admin/users", authenticateUser, checkAdmin, createAdminUser);

// Error-handling
app.use(handleCustomErrors);
app.use(handle500errors);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Please check your path is correct." });
});

module.exports = app;
