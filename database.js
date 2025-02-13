const mongoose = require("mongoose");
const { DATABASE_NAME, CONNECTION_STRING } = require("./config");
const { logger } = require("./utils/logger");

const DBconnection = async () => {
  try {
    console.log(`${CONNECTION_STRING}${DATABASE_NAME}`);
    await mongoose.connect(`${CONNECTION_STRING}${DATABASE_NAME}`);
    logger.info("Connection Established");
  } catch (error) {
    logger.error("Connection Not Established..!", error.message);
    throw error;
  }
};

module.exports = DBconnection;


//  ----------- .env.local --------
// PORT=5005
// DATABASE_NAME='chat-app'
// # CONNECTION_STRING="mongodb://192.168.43.141:27017/"
// CONNECTION_STRING="mongodb://0.0.0.0:27017/"

// --------- .gitignore ----------
// # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

// # dependencies
// /node_modules
// /.pnp
// /logs
// .pnp.js
// /public
// # testing
// /coverage
// # production
// /build
// # misc
// .DS_Store
// .env.local
// .env.development.local
// .env.test.local
// .env.production.local

// npm-debug.log*
// yarn-debug.log*
// yarn-error.log*
// package-lock.json
// .docz
// .eslintcache
// .vscode
// /logs/*
