const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  if (!authHeaders?.startWith("Bearer ")) return res.sendStatus(401);

  const token = authHeaders.split(" ")[1];
  jwt.verify(token);
};

module.exports = verifyJWT;
