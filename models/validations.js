const validateURL = (req, res, next) => {
  if (req.secure || req.protocol) {
    return next();
  } else {
    res.status(400).send(`Check your URL and try again!`);
  }
};

const validateDataType = (req, res, next) => {
  if (
    typeof req.body.captainName === "string" &&
    typeof req.body.title === "string" &&
    typeof req.body.post === "string" &&
    typeof req.body.mistakesWereMadeToday === "boolean" &&
    typeof req.body.daysSinceLastCrisis === "number"
  ) {
    return next();
  } else {
    res.status(404).send("Invalid data type");
  }
};

module.exports = { validateURL, validateDataType };
