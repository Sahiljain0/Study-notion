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
  