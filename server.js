const app = require("./app.js");

app.listen(8888, () => {
  console.log("server is now running on port 8888");
});

module.exports = app;
