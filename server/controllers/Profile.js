

const Profile = require("../models/Profile")
const CourseProgress = require("../models/CourseProgress")

const Course = require("../models/Course")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")
const { convertSecondsToDuration } = require("../utils/secToDuration")

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body
    const id = req.user.id

    // Find the profile by id
    const userDetails = await User.findById(id)
    const profile = await Profile.findById(userDetails.additionalDetails)

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    })
    await user.save()

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile
    await profile.save()

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id
    console.log(id)
    const user = await User.findById({ _id: id })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    })
    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      )
    }
    // Now Delete User
    await User.findByIdAndDelete({ _id: id })
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
    await CourseProgress.deleteMany({ userId: id })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" })
  }
}

// exports.getAllUserDetails = async (req, res) => {
//   try {
//     const id = req.user.id
//     const userDetails = await User.findById(id)
//       .populate("additionalDetails")
//       .exec()
//     console.log(userDetails)
//     res.status(200).json({
//       success: true,
//       message: "User Data fetched successfully",
//       data: userDetails,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id; // Assuming you are using a middleware to get the user ID from the request
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    console.log(userDetails);
    
    // Check if userDetails is found
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        accountType: userDetails.accountType,
        wallet: userDetails.wallet, // Include wallet balance in the response
        additionalDetails: userDetails.additionalDetails,
        image: userDetails.image,
        courses: userDetails.courses,
        courseProgress: userDetails.courseProgress,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 

// profile.js





exports.purchaseWithWallet = async (req, res) => {
  try {
    const { userId, purchaseAmount, courseId } = req.body;

    // Logging request body to confirm all fields are received correctly
    console.log("Request Body:", req.body);

    // Check if required fields are provided
    if (!userId || !purchaseAmount || !courseId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Fetch the user based on the ID
    const user = await User.findById(userId);

    // Check if the user exists and is a student
    if (!user || user.accountType !== "Student") {
      return res.status(400).json({ success: false, message: "Invalid user or not a student" });
    }

    // Check if user has sufficient balance in wallet
    if (user.wallet < purchaseAmount) {
      return res.status(400).json({ success: false, message: "Insufficient wallet balance" });
    }

    // Find the course by its ID
    const course = await Course.findById(courseId);

    // If the course is not found, return an error
    if (!course) {
      return res.status(400).json({ success: false, message: "Could not find the Course" });
    }

    // Check if the user is already enrolled in the course
    if (course.studentsEnrolled.includes(userId)) {
      return res.status(401).json({ success: false, message: "Student is already enrolled in this course" });
    }

    // Verify if the purchase amount matches the course price
    if (purchaseAmount !== course.price) {
      return res.status(400).json({ success: false, message: "Purchase amount does not match the course price" });
    }

    // Deduct the purchase amount from the wallet
    user.wallet -= purchaseAmount;

    // Create initial course progress for the user
    const courseProgress = await CourseProgress.create({
      courseID: courseId,
        userId: userId,
        completedVideos: [],
    });

    // Update the user's courses and course progress
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
          courseProgress: courseProgress._id
        },
        wallet: user.wallet 
      },
      { new: true }
    );

    // Enroll the user in the course on the course side as well
    course.studentsEnrolled.push(userId);
    await course.save();

    // Return success response with the updated wallet balance
    return res.status(200).json({
      success: true,
      message: "Purchase successful",
      updatedWalletBalance: updatedUser.wallet
    });
  } catch (error) {
    console.error("Error processing wallet purchase:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.buyCourse = async (req, res) => {
  try {
    const { userId, purchaseAmount, courseIds } = req.body;

    // Logging request body to confirm all fields are received correctly
    console.log("Request Body:", req.body);
    console.log("user id : ", userId);
    console.log("purchase amount : ", purchaseAmount);
  console.log("course ids : ", courseIds);
    // Check if required fields are provided
    if (!userId || !purchaseAmount || !courseIds || !Array.isArray(courseIds)) {
      return res.status(400).json({ success: false, message: "yaha h error bhai" });
    }

    // Fetch the user based on the ID
    const user = await User.findById(userId);
    
    // Check if the user exists and is a student
    if (!user || user.accountType !== "Student") {
      return res.status(400).json({ success: false, message: "Invalid user or not a student" });
    }

    // Check if user has sufficient balance in wallet
    if (user.wallet < purchaseAmount) {
      return res.status(400).json({ success: false, message: "Insufficient wallet balance" });
    }

    // Validate and enroll in each course
    const enrolledCourses = [];
    const courseProgressPromises = []; // To hold promises for creating course progress

    // Fetch all courses in parallel to improve performance
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Validate course existence and enroll
    for (const course of courses) {
      if (!course) {
        return res.status(400).json({ success: false, message: `Could not find the Course with ID: ${course._id}` });
      }

      // Check if the user is already enrolled in the course
      if (course.studentsEnrolled.includes(userId)) {
        return res.status(401).json({ success: false, message: `Student is already enrolled in the course with ID: ${course._id}` });
      }

      // Deduct the purchase amount from the wallet
      user.wallet -= course.price; // Deduct full course price

      // Create initial course progress for the user
      const courseProgress = await CourseProgress.create({
        userId: user._id,
        courseId: course._id,
        progress: 0 // Initialize the progress to 0
      });

      // Enroll the user in the course on the course side as well
      course.studentsEnrolled.push(userId);
      await course.save();

      // Push course ID and progress ID to arrays for later processing
      enrolledCourses.push(course._id);
      courseProgressPromises.push(courseProgress._id);
    }

    // Update the user's courses and course progress in a single update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: { $each: enrolledCourses },
          courseProgress: { $each: courseProgressPromises }
        },
        wallet: user.wallet 
      },
      { new: true }
    );

    // Return success response with the updated wallet balance
    return res.status(200).json({
      success: true,
      message: "Purchase successful",
      updatedWalletBalance: updatedUser.wallet
    });
  } catch (error) {
    console.error("Error processing wallet purchase for multiple courses:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

