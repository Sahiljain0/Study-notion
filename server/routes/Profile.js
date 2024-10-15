// const express = require("express");
// const router = express.Router();

// const {auth, isInstructor} = require("../middleware/auth");
// //Profile.js //
// const {
//   deleteAccount,
//   updateProfile,
//   getAllUserDetails,
//   updateDisplayPicture,
//   getEnrolledCourses,
//   instructorDashboard,
//   } = require("../controllers/Profile");

// // *******************************DEFINING API ROUTES******************
// // Delet User Account
// router.delete("/deleteProfile", auth, deleteAccount)
// router.put("/updateProfile", auth, updateProfile)
// router.get("/getUserDetails", auth, getAllUserDetails)
// // Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


// // ***********************************************************************

// module.exports = router;
const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,

} = require("../controllers/Profile")
const { purchaseWithWallet } = require('../controllers/Profile'); // Adjust the path

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
router.post("/purchaseWithWallet", purchaseWithWallet);

module.exports = router;