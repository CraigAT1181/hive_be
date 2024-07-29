const express = require("express");
const { getEndpoints } = require("./controllers/api.controller");
const {
  handleCustomErrors,
  handle500errors,
} = require("./controllers/errors.controller");

const app = express();
app.use(express.json());

// Routing
app.use("/", getEndpoints);
app.use("/api", getEndpoints);

// Error-handling
app.use(handleCustomErrors);
app.use(handle500errors);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Please check your path is correct." });
});

module.exports = app;
