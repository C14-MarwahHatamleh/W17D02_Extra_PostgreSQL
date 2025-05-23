const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const headers = req.headers;
  console.log(headers.authorization);
  if (!headers.authorization) {
    res.status(403).json({
      success: false,
      message: "unauthenticated",
    });
  } else {
    const token = headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "The token is invalid or expired",
        });
      } else {
        req.token = result;
        next();
      }
    });
  }
};


module.exports = authentication;
