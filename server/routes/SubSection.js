const express = require("express");
const router = express.Router();

// SubSection.js //
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// ************************************************************************************

//                            SUB_SECTION                           //
router.post("/createSubSection", createSubSection);
router.put("/updateSubSection", updateSubSection);
router.delete("/deleteSubSection", deleteSubSection);

// ***********************************************************************************

module.exports = router;
