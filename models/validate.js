function validate(req, res, next) {
  const {
    captainName,
    title,
    post,
    mistakesWereMadeToday,
    daysSinceLastCrisis,
  } = req.body;

  const areAllString = [captainName, title, post].every(
    (x) => typeof x == "string"
  );
  const isBool = typeof mistakesWereMadeToday === "boolean";
  const isNumber = typeof daysSinceLastCrisis === "number";

  const allValid = areAllString && isBool && isNumber;
  if (allValid) {
    return next();
  } else {
    res.status(400).send("invalid form data");
  }
}
module.exports = validate;
