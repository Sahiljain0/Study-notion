const Course = require("../models/Course");
const Category = require("../models/category");
const User = require("../models/User");
require("dotenv");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// handler function to create courese //
exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user id ", userId);
    // fetch data from request ki body //
    const {
      courseName,
      courseDescription,
      instructor,
      WhatYouWillLearn,
      price,

      category,
    } = req.body;
    // fetch thumbnail image from file from req ki body //
    const thumbnail = req.files.thumbnailImage;

    console.log("all course details : ", req.files);
    console.log("thumbnail : ", thumbnail);
    // validate //
    if (
      !courseName ||
      !courseDescription ||
      !instructor ||
      !WhatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(401).json({
        success: false,
        message: "All details are required...",
      });
    }

    // check for instructor details //
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    console.log("Instructor details ", instructorDetails);
    console.log("indtructor id : ", instructorDetails.id);
    if (!instructorDetails) {
      return res.status(401).json({
        success: false,
        message: "instructor details not found...",
      });
    }

    // validate the tag received from req ki body//
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(401).json({
        success: false,
        message: "Invalid category ....",
      });
    }

    // upload image to cloudinary //
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create  new course  in db  //
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      instructor: instructorDetails._id,
      WhatYouWillLearn: WhatYouWillLearn,
      price: price,
      category: categoryDetails._id,
      thumbnailImage: thumbnailImage.secure_url,
    });

    // now add the course to instructor details in the instructor schema  //
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          // with the $push opertor we push details//
          courses: newCourse._id, // Instructor me Courses me newCourse ki id daal do//
        },
      },
      { new: true }
    );
   console.log("Course added to instructor: ");
    // now updating the category schema usme courses me new cous //
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    console.log("Course added to category: ");

    return res.status(200).json({
      success: true,
      message: "Course created succcessfully...",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "SOmething went wrong...",
      error: error.message,
    });
  }
};

// ===========================================================

//handler function to get all courses //
exports.getAllCourses = async (req, res) => {
  try {
    // get all courses //

    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successully...",
      Data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "SOmething went wrong...",
    });
  }
};

// handler function to get a single  course details

exports.getCourseDetails = async (req, res) => {
  try {
    // fetch course id from req ki body //
    const { courseId } = req.body;

    // find the course //
    // with populate we are fetching
    // full nested details also//
    const courseDetails = await Course.find(
      { _id: courseId })
        .populate("category")

        .populate({
          path: "ratingAndReviews",
          populate: {
            path: "user",
            select: "firstName lastName accountType image",
          },
        })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })

        .exec();
   

    // validating courseDetails //
    if (!courseDetails) {
      return res.status(401).json({
        success: false,
        message: "Course details not found...",
      });
    }

    // return success response /
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully....",
      data: courseDetails, // this will display courseDetails on screen on response//
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Something went wrong....",
    });
  }
};
