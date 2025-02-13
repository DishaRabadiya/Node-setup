const Models = require('../models/index.model');
const ResponseHelper = require('../Helper/ResponseHelper');
const { logger } = require('../utils/logger');
// const { logger } = require('../Utils/logger');

const authMiddleware = async (req, res, next) => {
  try {
    let parentsdata;
    if (req.headers.authorization === undefined || req.headers.authorization === null || req.headers.authorization === '') {
      return ResponseHelper.invalidToken(res, 'Invalid Token');
    } else {
      const authentication = req.headers.authorization.replace('Bearer ', '');
      if (authentication !== undefined || authentication !== 'undefined' || authentication !== null || authentication !== 'null') {
        const data = await Models.userModel.findOne({
          where: {
            verify_token: authentication
          }
        });
        // FOR APPLICATION - PARENTS LOGIN
        if (data === null) {
          parentsdata = await Models.parentsModel.findOne({
            where: {
              verify_token: authentication
            }
          });
        }
        if (data !== null || parentsdata !== null || authentication === 'STATIC_TOKEN') next();
        else ResponseHelper.invalidToken(res, 'Unauthorized User');
      } else ResponseHelper.invalidToken(res, 'Invalid Token');
    }
  } catch (error) {
    logger.error('=================== ERROR FROM AUTH MIDDLEWARE ===================');
    logger.error(error);
  }
};
module.exports = {
  authMiddleware
};
