const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
// handler to create sub section //
exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req ki body //
    const { title, timeDuration, description, sectionId } = req.body;
    // extract video url from file/video//
    const video = req.files.videoFile;
    console.log("video is : ", video);
    console.log("body data :", req.body);
    // validate data //
    if (!title || !timeDuration || !description || !sectionId || !video) {
      return res.status(401).json({
        success: false,
        message: "ALl fields are required...",
      });
    }
    // upload video to cloudinary //
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // ab ye uploadDetails me video ka url aajyega //

    // create entry in subsection //
    const SubSectionDetails = await SubSection.create({
      title: title,
      description: description,
      videoUrl: uploadDetails.secure_url,
      timeDuration: timeDuration,
    });
    console.log("Section id is : ", sectionId);
    // add subsection id to section //
    const updateSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    );

    //TODO: Console log subsection after updating the subsection //
    // return response //
    return res.status(200).json({
      success: true,
      message: "SubSection created successfully....",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Something went wrong...",
    });
  }
};

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
