const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const middleware = require("./utils/middlewares");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Error Connecting to MongoDB:", err.message));

// middleware
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

// Routers
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// ending middleware
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
