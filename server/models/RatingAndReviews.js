const mongoose = require("mongoose");


const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },

    review:{
        type:String,
        trim:true,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
        index:true,
    }

});

module.exports = mongoose.model("RatingAndReviews", ratingAndReviewSchema);