const express = require("express");
const multer = require('multer');
const path = require('path');

const { getEndpoints } = require("./controllers/api.controller");
const { getUsers, addUser, loginUser, deleteUser, getUserInfo, logout } = require("./controllers/users.controller");
const { getPosts, getSinglePost, addPost } = require("./controllers/posts.controller");

const {
  handleCustomErrors,
  handle500errors,
} = require("./controllers/errors.controller");

const cors = require("cors");


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  }
});

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
app.post("/users/logout", logout);
app.delete("/users/:user_id", deleteUser);

app.get("/posts", getPosts);
app.get("/posts/:postId", getSinglePost);
app.post("/posts", upload.array('media-files'), addPost);

// Error-handling
app.use(handleCustomErrors);
app.use(handle500errors);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Please check your path is correct." });
});

module.exports = app;
