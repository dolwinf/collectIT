var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log(token);

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied" });
  }

  //Verify token
  jwt.verify(token, "secretqazwsx12345", function (err, decoded) {
    if (err) throw err;
    // req.user = decoded.user;
    next();
  });
};
