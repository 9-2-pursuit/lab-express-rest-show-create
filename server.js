// DEPENDENCIES
require("dotenv").config();
const app = require("./app.js");

// CONFIGURATION
const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
