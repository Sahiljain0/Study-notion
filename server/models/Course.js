const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
   
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  WhatYouWillLearn: {
    type: String,
  },

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReviews",
    },
  ],
  price: {
    type: Number,
  },
  tag: {
    type: [String],
    required:true,
  },
  thumbnailImage: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  instructions:{
    type : [String],
  },

  status:{
    type : String,
    enum : ["Draft", "Published"],
  }

});
module.exports = mongoose.model("Course", courseSchema);


// we use array where we have multiple items //

