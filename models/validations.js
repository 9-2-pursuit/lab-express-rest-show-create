const validateURL = (req, res, next) => {
  if (
    // req.body
    // req.body.url.substring(0, 7) === "http://" ||
    // req.body.url.substring(0, 8) === "https://"

    // req.body.url.match(/https?:\/\//)

    req.protocol === "http"
  ) {
    return next();
  } else {
    res
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
    res.redirect(400, "/");
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
    next();
  } else {
    res.status(404).send("Invalid data type");
  }
};

module.exports = { validateURL, validateDataType };
