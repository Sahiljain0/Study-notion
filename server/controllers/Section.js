// creating the handler function for creating sections//
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
exports.createSection = async (req, res) => {
  try {
    // fetch data from req ki body //
    const { sectionName, courseId } = req.body;

    // validate details//
    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: "all details are required...",
      });
    }
    // create  new section //
    const newSection = await Section.create({ sectionName });

    // update the section id in course schema //
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Scetion created successfully...",
      updatedCourse,
    });
  } catch (error) {
    // console.log(error);
    return res.status(501).json({
      success: false,
      message: "Something wen wrong...",
      error: error.message,
    });
  }
};

// =====================================================
//handler function to update ta section //

// exports.updateSection = async (req, res) => {
//   try {
//     // fetch data from req ki body //
//     const { sectionName, sectionId } = req.body;

//     // validation//
//     if (!sectionName || !sectionId) {
//       return res.status(401).json({
//         success: false,
//         message: "all details are required...",
//       });
//     }

//     // updation //
//     const section = await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       { sectionName },
//       { new: true }
//     );

//     //return response //
//     return res.status(200).json({
//       success: true,
//       message: "Section updated successfully...",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(501).json({
//       success: false,
//       message: "Something went wrong...",
//     });
//   }
// };

// ================================================
// handler to delet a section //
// TODO : do we need do delete sectionId  from courses schema also //

// exports.deleteSection = async (req, res) => {
//   try {
//     // fetch sectionId for deleting we just need section id //
//     const { sectionId, courseId } = req.body;

//     // validation //
//     if (!sectionId) {
//       return res.status(401).json({
//         success: false,
//         message: "section id not found...",
//       });
//     }
//     // update in course by removing section from it //
//     await Course.findByIdAndUpdate(
//       { _id: courseId },
//       { $pull: { courseContent: sectionId } },
//       { new: true }
//     );
//     const sectionDetails = await Section.findById({_id:sectionId});
//     // console.log("length of section : ",sectionDetails.subSection.length);

//     // Check if the section has subsections, and delete them
//     if (sectionDetails && sectionDetails.subSection.length > 0) {

//       await SubSection.deleteMany({ _id: { $in: sectionDetails.subSection } });
//     }

//     //now delete section//
//     await Section.findByIdAndDelete(sectionId);
//     return res.status(200).json({
//       success: true,
//       message: "Section deleated successfully...",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(501).json({
//       success: false,
//       message: "Something went wrong...",
//     });
//   }
// };

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		// console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		// console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   

exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		// console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};