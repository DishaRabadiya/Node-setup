const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT, NODE_ENV } = require("./config");
const { logger } = require("./utils/logger");
const env = NODE_ENV || "production";
const fileupload = require("express-fileupload");
const paths = require("path");
const app = express();
const fs = require("fs");
const DBconnection = require("./database");
DBconnection();
app.use(cors({ origin: true }));
app.use(fileupload());
app.use(express.static("files"));
app.use(async function (req, res, next) {
  // print request URL
  logger.info(`URL ---------:-------- ${req.url}`);
  next();
});
app.use(bodyParser.json({ limit: "1024mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "2048mb",
    extended: false,
    parameterLimit: 102400000000000,
  })
);

// all modules routes
const userRoutes = require("./modules/users/users.routes");
app.use(userRoutes);
// synchronize public folder path
const publicFolder = paths.join(__dirname, "./public");
if (!fs.existsSync(publicFolder)) {
  fs.mkdirSync(publicFolder);
  if (!fs.existsSync(`${publicFolder}/assets`)) {
    fs.mkdirSync(`${publicFolder}/assets`);
  }
}

app.listen(PORT, async () => {
  logger.info(`---- ENV: ${env} ----`);
  logger.info(`---- PORT: ${PORT} ----`);
});
