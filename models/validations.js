function validateLog(req, res, next) {
  console.log(req.body);
  console.log(typeof req.body.captainName);
  console.log(typeof req.body.mistakesWereMadeToday);
  console.log(typeof req.body.daysSinceLastCrisis);
  const captainNameType = "string";
  const titleType = "string";
  const postType = "string";
  const mistakesWereMadeTodayType = "boolean";
  const daysSinceLastCrisisType = "number";
  if (
    typeof req.body.captainName === captainNameType &&
    typeof req.body.title === titleType &&
    typeof req.body.post === postType &&
    typeof req.body.mistakesWereMadeToday === mistakesWereMadeTodayType &&
    typeof Number(req.body.daysSinceLastCrisis) === daysSinceLastCrisisType
  ) {
    next();
  } else {
    res.status(406).json({
      error: "Incorrect data type inputted, try again",
      captainNameType: typeof req.body.captainName,
      titleType: typeof req.body.title,
      postType: typeof req.body.post,
      mistakeType: typeof req.body.mistakesWereMadeToday,
      lastCrisisType: typeof req.body.daysSinceLastCrisis,
    });
  }
}

module.exports = { validateLog };
