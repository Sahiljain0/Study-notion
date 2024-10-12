const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
// handler to create sub section //
exports.createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description } = req.body
    const video = req.files.video

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" })
    }
    console.log(video)

    // Upload the video file to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    )
    console.log(uploadDetails)
    // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    })

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection")

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection })
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// ============================================================
//handler to update subsection//

exports.updateSubSection = async (req, res) => {
  try {
    //fetch data from req ki body //
    const { subSectionId, title, timeDuration, description } = req.body;
    const NewVideo = req.files.videoFile;
    console.log("Details : ", req.body);
    console.log("video : ", NewVideo);
    // validation //
    if (!subSectionId || !title || !timeDuration || !description || !NewVideo) {
      return res.status(401).json({
        success: false,
        message: "All details are mandatory....",
      });
    }
    let uploadDetails = null;
		// Upload the video file to Cloudinary
		if(NewVideo){
		 uploadDetails = await uploadImageToCloudinary(
			NewVideo,
			process.env.FOLDER_NAME
		);
		}

    // update data in db //
    await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title :title,
        timeDuration : timeDuration  ,
        description :description,
        videoUrl : uploadDetails.secure_url,
      },
      { new: true }
    );
    // return response //
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully....",
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      message: "SOmething went worng....",
    });
  }
};

// =======================================================
// handler function to delete a subsection //
exports.deleteSubSection = async (req, res) => {
  try {
    // fetch data from request ki body //
    const { subSectionId ,sectionId} = req.body;
    // const sectionId = req.body.sectionId;
    console.log("Section id : ", sectionId);
    console.log("body : ", req.body);
    // validation//
    if (!subSectionId ) {
      return res.status(401).json({
        success: false,
        message: "Subsection id missing...",
      });
    }

    // delet the subsection //
    const deleteSubSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    
    // update section by deleting subscetion id //
    if (!sectionId) {
      return res.status(401).json({
        success: false,
        message: "section id missing...",
      });}
    await Section.findByIdAndUpdate({_id:sectionId},
      {$pull:{subSection:subSectionId}},
      {new:true}
    );
    console.log("Subsection removed from section...");
    return res.status(200).json({
      success: true,
      message: "SubScetion deleted successfully....",
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      message: "something went wrong....",
    });
  }
};
