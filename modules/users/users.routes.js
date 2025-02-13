const {
  inserUsersController,
  userLoginController,
} = require("./users.controller");

const router = require("express").Router();
router.post("/insertuserdata", inserUsersController);
router.post("/userlogin", userLoginController);
module.exports = router;
