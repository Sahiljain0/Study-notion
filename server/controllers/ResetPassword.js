// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// ///reset password token //
// exports.resetPasswordToken = async (req,res) => {
//     try{
//         //get email from request ki  body //
//         const {email} = req.body;
//         console.log(`email is : ${email}`);
//         //verify the mail id exist or not //
//         const user = await User.findOne({email : email});
//         if(!user){
//             return res.status(401).json({
//                 success:false,
//                 message:"USer dosent registered..."
//             });
//         }

//         // generate token //
//         const token = crypto.randomBytes(20).toString("hex");     // this in built function generates a new id every time //

//         // update user in db by addding token and expire time //
//         const updateDetails= await User.findOneAndUpdate({email : email}, { 
//                                                 token : token,
//                                                 resetPasswordExpires: Date.now() + 3600000,

//                                                },
//                                                  {new: true}  // by this we are returnning the new updated 
//                                                                 // document by adding token and expires//
//                                                 )
//         console.log("DETAILS", updateDetails);
//         // create url //
//         const url = `http://localhost:3000/update-password/${token}`          
        
//         // send mail containing the url //
//         await mailSender( email,
//                           "Password reset link ",
//                           `Your link for email verification is ${url} . Please click this url to reset your password.`)
//         // return response//
//          res.json({
//             success:true,
//             message:"Email send successfully pleases change the password...",
//         });
        
//     }
//     catch(error){
//         return res.status(501).json({
//         error:error.message,
//         success:false,
//         message:"Something went wrong..."
//        });
//     }
// }


// // =========================================================

// //reset password //
// exports.resetPassword = async (req,res) => {
//     try{
//             // fetch data from request ki body //
//             const { password, confirmPassword, token} = req.body;
//             // validation
//             if(confirmPassword !== password){
//                 return res.status(401).json({
//                     success:false,
//                     message:"Password and confirm password dosent match..."
//                 });
//             }
            
//             const userDetails = await User.findOne({token : token});
//             console.log("user details are : ", userDetails);
//             //validation //
//             if(!userDetails){
//                 return res.status(401).json({
//                     success:false,
//                     message:"Token is invalid...."
//                 });
//             }
//             //token time check //
//             if(Date.now() > userDetails.resetPasswordExpires){
//                     return res.status(401).json({
//                         success:false,
//                         message:"Token expired please regenerate token..."
//                     });
//             }
//             // hash password
//             const encryptedPassword = await bcrypt.hash(password, 10);
//             // update the new password in db //
//             await User.findOneAndUpdate(
//                 { token: token },
//                 { password: encryptedPassword },
//                 { new: true }
//             );
      
//             // console.log("new pass: ", encryptedPassword);
            
//             // return response //
//              res.status(200).json({
//                 success:true,
//                 message:"Password updated successfully..." 
//             })

//     }
//     catch(error){
//         console.log(error);
//         return res.status(501).json({
//             success:false,
//             message:"SOmething went wrong please try again later..."
//         });
//     }
// }

const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
        console.log("email is : ", email);
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		const url = `http://localhost:3000/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};