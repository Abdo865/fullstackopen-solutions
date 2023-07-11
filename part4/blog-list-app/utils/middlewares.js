const jwt = require("jsonwebtoken");
const User = require("../models/user");
const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer "))
    req.token = authorization.replace("Bearer ", "");
  else req.token = null;

  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) req.user = null;
  else {
    const token = jwt.verify(req.token, process.env.SECRET);
    if (!token.id) req.user = null;
    else req.user = await User.findById(token.id);
  }
  next();
};

const unknownEndPoint = (req, res) =>
  res.status(404).json({ error: "Unknown endPoint" });

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError")
    return res.status(400).send({ error: "Malformed id" });
  else if (err.name === "ValidationError")
    return res.status(400).json({ error: err.message });

  next(err);
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
