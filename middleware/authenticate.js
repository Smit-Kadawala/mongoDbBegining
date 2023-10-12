const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decode = jwt.verify(token, "RadheRadhe");

    req.user = decode;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(401).json({
        message: "Token Expired",
      });
    } else {
      res.json({
        message: "Authentication Failed! ",
      });
    }
  }
};

module.exports = authenticate;