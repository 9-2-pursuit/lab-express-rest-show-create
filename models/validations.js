const validateURL = (req, res, next) => {
  if (
    req.protocol == "http"
    // req.body.url.match(/https?:\/\//)
    // req.body.url.substring(0, 7) === "http://" ||
    // req.body.url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
  }
};

module.exports = { validateURL };
