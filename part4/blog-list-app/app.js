const express = require("express");
const middleware = require("./utils/middlewares");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Error Connecting to MongoDB:", err.message));

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
