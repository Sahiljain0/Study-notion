const express = require("express");
const router = express.Router();

// auth ka middleware //
const {auth, isStudent, isAdmin, isInstructor} = require("../middleware/auth");
// Category.js //
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");

// ************************DEFINING API ROUTES************************************
router.post("/createCategory",auth , isAdmin , createCategory );
router.get("/showAllCategories",showAllCategories);
router.get("/categoryPageDetails",categoryPageDetails);

// ****************************************************************************
module.exports = router;
