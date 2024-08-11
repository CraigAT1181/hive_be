const app = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
