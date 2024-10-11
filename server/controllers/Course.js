const Course = require("../models/Course")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User");
require("dotenv");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress = require("../models/CourseProgress")




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

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnroled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}