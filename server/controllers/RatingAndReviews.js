const User = require("../models/User");
const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");
exports.createRatingAndReviews = async (req, res) => {
  try {
    // fetch data from req ki body //
    const { rating, review, courseId } = req.body;
    // fetch userId //
    const userId = req.user.id;

    // validation //
    if (!userId || !rating || !review || !courseId) {
      return res.status(401).json({
        success: false,
        message: "all detail are mandatory...",
      });
    }
    // user is enrolled in course or not //
    const userEnrolled = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!userEnrolled) {
      return res.status(401).json({
        success: false,
        message: "User not enrolled...",
      });
    }

    //  check is user already reviewed one review per user is allowed //
    const alreadyReview = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReview) {
      return res.status(401).json({
        success: false,
        message: "User alredy reviewed...",
      });
    }
    // create rating and review //
    const ratingReview = await RatingAndReviews.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });

    // update course with the new rating/review //
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);
    // return res //
    return res.status(200).json({
      success: true,
      message: "Rating and reviews created successfully....",
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Something went wrong....",
    });
  }
};

// =================================================
// hamdler function to getAverage rating to dislay on course //

exports.getAverageRating = async (req, res) => {
  try {
    // fetch data from req ki body //
    const courseId = req.body.courseId;

    // calculating avg. rating //
    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
        $group: {
          _id: null,
          averageRating: { $avg: "rating" },
        },
      },
    ]);

    // return rating //
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no one has done rating on teh course rating is empty zero //
    return res.status(200).json({
      success: true,
      message:
        "Average rating is zero , as no user has reviewed the course now...",
      averageRating: 0,
    });
  } catch (error) {
    concole.error(error);
    return res.status(501).json({
      success: false,
      message: "Something went worng....",
    });
  }
};

// ================================================
//  handeler to getAll reviews //

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReviews.find({})
      .sort({ rating: "des" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All ratings fetched successfully....",
      data: allReviews,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
