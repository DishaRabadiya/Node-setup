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
