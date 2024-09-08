const Category = require("../models/category");
const Course = require("../models/Course");
const User = require("../models/User");
// create tag ka handler function //
exports.createCategory = async (req,res) => {
    try{

        const userId = req.user.id;
        const {name, description } = req.body;
        

        //validation //
        if(!name ){
            return res.status(401).json({
                success:false,
                message:"All details are required..."
            });
        }
        //validate user if admin //
        console.log("User id : ", userId);
        const userDetails = await User.findById(userId,{
            accountType:"Admin"
        });
        console.log("User details: ", userDetails);
        if(!userDetails ){
            return res.status(501).json({
                success:false,
                message:"User details not found...",
            })
           
        };
        // create entry in db //
      
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log(categoryDetails);

        // return response //
        return res.status(200).json({
            success:true,
            message:"category created successfully..."
        });
        
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Somthing went wrong...",
        });
    }
}

// ===================================================================


// showAllCategories handler function //

exports.showAllCategories = async (req,res) => {
    try{
        // find all categories  but make sure all should have name and description //
      const allCategories = await Category.find({},{name:true, description:true}); 
      return res.status(200).json({
        success:true,
        message:"all categories returned successfully...",
        allCategories,
      })
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Something went wrong..."
        });
    }
}

// =================================================================
// handler function to get category page details //

exports.categoryPageDetails = async (req,res) => {
    try{
        // fetch data /
        const { categoryId } = req.body;

        // get all courses for the specific category // example caategory 
        // python h to uske sbhi courses nikl do //

        const selectedCategory =  await Category.findById({_id:categoryId})
                                                                    .populate("courses")
                                                                    .exec();
        console.log(selectedCategory);

        // handle the case when category is not found //
        if(!selectedCategory){
            return res.status(401).json({
                success:false,
                message:"Selected category not found...",
            });
        }

        // handle the case when there is no course available in category//
        if(!selectedCategory.courses.length === 0){
            return res.status(401).json({
                success:false,
                message:"Course not found...",
            });
        }
        // put all the avaiable courses to selected courses //
        const selectedCourses = selectedCategory.courses;

        // get courses of all othere categories //
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },

        }).populate("courses");

        let differentCourses = [];
        for (const category of categoriesExceptSelected){
            differentCourses.push(...category.courses);
        }
       



        // get top selling courses among all catgoies //
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
                                    .sort((a,b) =>  b.sold - a.sold)
                                    .slice(0,10);
        // return response //
        res.status(200).json({
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
            
        });
    }
    catch(error){
        return res.status(501).json({
            success:false,
            message:"Something went wrong...",
            error:error.message,
        });
    }
}