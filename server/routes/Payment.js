const express = require("express");
const router = express.Router();

// importing controllers //
// Payment.js //
const { 
    capturePayment,
    verifySignature 
  } = require("../controllers/Payments");

  const {auth, isStudent} = require("../middleware/auth");
// ***************** DEFINING API ROUTES ****************************************

router.post("/capturePayment",capturePayment, auth, isStudent);
router.post("/verifySignature",verifySignature);

// ********************************************************************************

module.exports = router;