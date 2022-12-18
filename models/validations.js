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
  
module.exports = { validateURL };