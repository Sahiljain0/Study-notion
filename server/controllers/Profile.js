// HW: how to schedule a request //
// Example : if a user is deleting its account in facebook its account get 
// delete permnently after  15 days //
const User = require("../models/User");
const Profile = require("../models/Profile");


exports.updateProfile = async (req,res) => {
    try{
      
        //get data //    dateOfBirt=""   -> if user didnt provide make it default
        const { gender, dateOfBirth="", about="", contactNumber} = req.body;

        //get userid//
        const id = req.user.id;
        // validate data //
        if(!about || !contactNumber || !id){
            return res.status(401).json({
                success:false,
                message:"All details are mandatory...",
            });
        }
        // find profile//
        const userDetails = await User.findById(id);
        const profileId =  userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update profile//

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about = about;
        profileDetails.gender = gender;s
        await profileDetails.save();
        // return response //
       return res.status(200).json({
        success:true,
        message:"Profile details updated successfully...",

       });
    }
    catch(error){
        console.error(error);
        return res.status(501).json({
            success:false,
            message:"Something went wrong...",
        });
    }

}

// ========================================================
// handler function to delete profile 


exports.deleteAccount = async (req,res) => {
    try{
      
        // fetch data from req ki body //
        const id = req.user.id;
        // validation //
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found..."
            });
        }
        // delete profile //
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // delet profile from user schema //
        await User.findByIdAndDelete({_id:id});
        
        //HW: first unenroll user from all enrolled courses then delete user //
        //return response //
        return res.status(200).json({
            success:true,
            message:"User Account deleted successfully...",
        });
    }
    catch(error){
        concole.error(error);
        return res.status(501).json({
            success:false,
            message:"Something went wrong...",
        });
    }
}


// ==========================================================
// handler function to get all user details //

exports.getAllUserDetails = async (req,res) => {
    try{
     // fetch id from request //
     const {id} = req.user.id;
     // validation//
     const userDetails = await User.findById(id).populate("additionalDetails").exec();
      // populate function ki help se profile ki id me additional details me jo data 
      // h usko userDetails me populate kr denge //
      console.log(userDetails);
      // return response //
      return res.status(200).json({
        success:true,
        message:"user details fetched successfully...",
        data:userDetails,
      });
    }
    catch(error){
        return res.status(501).json({
            success:false,
            message:"something went worng...",
          });
    }
}


// ******make a handler functiion to get all a single user details ****//
//********make a handler function to update profile picture*** */

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