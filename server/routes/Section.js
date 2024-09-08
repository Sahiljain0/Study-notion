const express = require("express");
const router = express.Router();

//Sections.js //
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Sections");

//*********************************************************************************
//                              SECTION                     //
router.post("/createSection",createSection);
router.put("/updateSection",updateSection);
router.delete("/deleteSection",deleteSection);

// *******************************************************************************
module.exports = router;