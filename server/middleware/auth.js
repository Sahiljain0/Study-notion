// authentication and authorization are handeled inside the middlewares //
const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//auth
exports.auth = async (req,res,next) =>  {
    try{
        // extract token //
        const token = req.cookies.token
                                || req.body.token
                                || req.header("Authorisation").replace("Bearer ", "");
          
        // if token not found //
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found..."
            });
        }

        // verifying the token //
        try{
           const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;   // request ke andr jo user object h usme decode daal do//
        }
        catch(error){
            console.log(error);
            return res.status(401).json({
                success:false,
                message:"Invalid token found...."
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"SOmething went wrong...."
        });

    }
}

// =============================================================================================

//IsStudent

exports.isStudent = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for student..."
            })
           }
           next();
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Usser role can not be varified Something went worng...."
        });
    }
}

// =====================================================================================================

//IsInstructor
exports.isInstructor = async (req,res,next) => {
    try{

        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor.."
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"User role is not valid something went wrong..."
        });
    }
}
// =====================================================================================

//IsAdmin
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin..."
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"User role is not valid something went wrong..."
        });
    }
}
