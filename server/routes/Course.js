const express = require("express");
const router = express.Router();

//importing the middleware //
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middleware/auth");

// Course.js //
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");

//***************************************************************************//
//                                 COURSES                                  //
router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourses", getAllCourses);
router.get("/getCourseDetails", getCourseDetails);

// ******************************************************************************

module.exports = router;
