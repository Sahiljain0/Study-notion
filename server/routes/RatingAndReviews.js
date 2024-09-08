const express = require("express");
const router = express.Router();

//RatingAndReviews.js//
const {
    createRatingAndReviews,
    getAverageRating,
    getAllRating,
  } = require("../controllers/RatingAndReviews");

//*******************************************************************************
//                    RATING AND REVIEWS                            //
router.post("/createRatingAndReviews",createRatingAndReviews);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRating",getAllRating);
// ****************************************************************************

module.exports = router;