
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password:{
    type: String,
    required:true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
 
  token:{
    type:String,
  },
  resetPasswordExpires:{
    type:String,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  image: {
    type: String,
    required: true,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgress",
    },
  ],
  wallet: {
    type: Number,
    default: 2000, // Default wallet balance
  },
});
// Pre-save middleware to manage the wallet field based on accountType
userSchema.pre("save", function (next) {
  if (this.accountType !== "Student") {
    this.wallet = undefined; // Remove the wallet field for non-student accounts
  } else if (this.wallet === undefined) {
    this.wallet = 2000; // Set the default wallet balance for student accounts if not already set
  }
  next();
});

module.exports = mongoose.model("user", userSchema);