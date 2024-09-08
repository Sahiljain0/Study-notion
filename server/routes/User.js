const express = require("express");
const router = express.Router();

// importing controllers //
const {
  sendOTP,
  signup,
  login,
  changePassword,
} = require("../controllers/Auth");

//ResetPassword.js //
const {
  resetPasswordToken,
    resetPassword,
  } = require("../controllers/ResetPassword");
  
const {auth} = require("../middleware/auth");

// *******************************************************************
// defining user routes //
router.post("/sendotp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/changePassword",auth, changePassword);

// **********************************************************************
router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword", resetPassword);
// **********************************************************************


module.exports = router;
