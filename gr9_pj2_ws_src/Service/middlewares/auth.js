const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Bearer Token
    var decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: true, message: "Authentication failed!" });
  }
};
