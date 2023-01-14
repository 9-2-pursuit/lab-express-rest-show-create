const server = require("express");
const logsController = require("./controllers/logs.controller");

const app = server();

// Tenemos que agregar esta linea de codigo para poder hacer que las peticiones con BODY (POST, PUT principalmente), puedan ser leidas correctamente
// ya que, por defecto, Express no evalua bodys en formato JSON
// Tenemos que, explicitamente, indicarle que queremos utilizar bodys en formato JSON
app.use(server.json());

app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

// Es un grupo de rutas
app.use("/logs", logsController);

app.get("/*", (req, res) => {
  res.status(404).send("Sorry, page doesn't exist");
});

app.listen(3000, () => console.log("I'm working great"));

module.exports = app;
