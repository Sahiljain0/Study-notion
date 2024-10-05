const express = require("express");
const router = express.Router();

//Profile.js //
const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateDisplayPicture,
  } = require("../controllers/Profile");

// *******************************DEFINING API ROUTES******************

router.put("/updateProfile", updateProfile);
router.delete("/deleteAccount",deleteAccount);
router.get("/getAllUserDetails",getAllUserDetails);
router.get("/updateDisplayPicture",getAllUserDetails);


// ***********************************************************************

module.exports = router;