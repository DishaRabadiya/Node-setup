const { serviceToController } = require("../../helpers/responseHelpers");
const { logger } = require("../../utils/logger");
const models = require("../../models/index.model");
const md5 = require("md5");

const userLoginService = async (loginData) => {
  try {
    console.log('loginData', loginData);
    const findUserCredentials = await models.userModel.findOne();
    if (findUserCredentials !== null) {
     return serviceToController(1, findUserCredentials, "Login SuccessFully");
    } else {
     return serviceToController(2, [], "UserName Or Password Are Invalid");
    }
  } catch (error) {
    logger.error(error);
    logger.error("------------ ERROR FROM : userLoginService ------------");
    return serviceToController(4, [], "ERROR FROM : userLoginService");
  }
};

const insertUserService = async (userData) => {
  try {
    console.log('userData', userData);
    const insertUserData = await models.userModel.create({
      full_name: userData.full_name,
      email:userData.email,
      password: md5(userData.password),
      role: userData.role, //  "1-superadmin ,2-admin ,3-staff"
    });
    console.log('insertUserData', insertUserData);
    if (insertUserData !== null) {
      return serviceToController(1, [], "User Inserted Successfully");
    } else {
      return serviceToController(2, [], "User Not Inserted ");
    }
  } catch (error) {
    if (error.code === 11000) { // unique concept error 
      return serviceToController(3, [], "Duplicate key error: Email Or Mobile Number already exists");
    }
    logger.error(error);
    logger.error("------------ ERROR FROM : insertUserService ------------");
    return serviceToController(4, [], "ERROR FROM : insertUserService");
  }
};


const updateUserDataService = async(userData)=>{
  try {
    const updateUserData = await models.userModel.updateOne()
  } catch (error) {
    logger.error(error);
    logger.error("------------ ERROR FROM : updateUserDataService ------------");
    return serviceToController(4, [], "ERROR FROM : updateUserDataService");
  }
}


module.exports = {
  insertUserService,
  userLoginService,
};
