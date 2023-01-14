const router = require("express").Router();
const logsData = require("../models/log");

router.get("/", (req, res) => {
  res.json(logsData);
});

router.get("/:id", (req, res) => {
  const logslength = logsData.length - 1;
  const indexOfArray = Math.round(Number(req.params.id));

  /* 
    req.params = {
      id: nnnn,
      index: nnnn
    }

    const id = req.params.id
    const { index } = req.params
  */

  if (indexOfArray > logslength) {
    res.redirect("/*");
    return;
  }

  res.json(logsData[indexOfArray]);
});

router.post("/", (req, res) => {
  // 1-. Obtener el body de la peticion
  // 2-. Agregar ese body a mi listado de logs

  //   El req.body contiene la data que envia el usuario desde el BODY de la peticion
  const body = req.body;

  const result = logsData.push(body);
  res.json(result);
});

router.put("/:index", (req, res) => {
    const bodyPut = req.body;
    const { index } = req.params;

    // splice ==> [1,2,3,4,5,6] ==> splice(index, nro-a-remover, elem-a-insertar)
    // arr.splice(2, 1, 8) ==> [1,2,8,4,5,6]
    logsData.splice(index, 1, bodyPut)

    res.json(logsData);
  }
)

router.delete("/:index", (req, res) => {
    const { index } = req.params; // const index = req.params.index en el primer caso esta desestructurado

    

  // MUTAR!
  logsData.splice(index, 1);
  // EL SLICE NO MUTA.
  // slice ==> recuperar usualmente un pedazo de valores del array [1,2,3,4,5,6] ==> slice(1, 3) ==> [2, 3]

  // EL SPLICE SI MUTA.
  // splice ==> [2,3,4,6] ==> splice(3, 1) ==> MUTA El array original

  res.json(logsData);
});

module.exports = router;
