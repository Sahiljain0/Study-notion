// all business logics are written inside the controller //
const User = require("../models/User");
const OTP =  require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
require("dotenv").config();
const jwt = require("jsonwebtoken");
//SendOTP


exports.sendOTP  = async (req, res) => {
    
   try{
     //fetching email from request ki body //
     const {email} = req.body;
    
     // check if user already exists //
     const checkUserPresent = await User.findOne({email});
 
     // if user already preent //
     if(checkUserPresent) {
         return res.status(401).json({
             success:false,
             message:"Email already registered....",
         });
     }
     // if user didint alredy present generate and send otp//
     var otp  = otpGenerator.generate(6, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
     });

     
     // check the generated otp is unique or not //
     const result = await OTP.findOne({otp: otp});
     console.log("Otp generated : ", otp );
     console.log(result);

     // jab tak generated otp db me alreday h tb tk new geerate kro //
     while(result){
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            // lowerCaseAlphabets:false,
            // specialChars:false,
        });}
        // again check the otp in db //
        // result = await OTP.findOne({otp:otp});

        const otpPayload = {email,otp};
        // create entry in db //
        const otpBody = await OTP.create(otpPayload);
        console.log("otp body ", otpBody);

        // otp created successfully //
        res.status(200).json({
            success:true,
            message:"Otp sent successfully...",
            otp,
        })
     }

 

   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        messsage:"Otp didnt sent....",
    });

   }
};

// =============================================================================================

//signup
exports.signup = async (req,res) => {
   try{
     
    //fetch data from req ki body //
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body;
    //validation kro  all fields are mandatory //
    if(!firstName || !lastName || !email || !otp || !password || !confirmPassword){
        return res.status(403).json({
            success:false,
            message:"All fields are mandatory...",
        });

    };
    // match passwords original and confirm one//
    if(password !== confirmPassword){
        return res.status(40).json({
            success:false,
            message:"Both passwords must be same..",
        });
    };

    // check if user alredy register or not //
     const existingUser = await User.findOne({email : email});

     if(existingUser){
        return res.status(401).json({
            success:false,
            message: "email aleady registered ..",
        });
     };
    
     // find most recent otp stored for the user //
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
     console.log("Recent email is : ",recentOtp);
     console.log("Recent otp is : ",recentOtp[0].otp);//testing//

    //validate otp //
    if(recentOtp.length == 0){
        return res.status(401).json({
            success:false,
            message:"Otp not found...",
        });
    }
    else if(otp !== recentOtp[0].otp){
        return res.status(400).json({
           success:false,
            message:"invalid oto...",
        })
    };

    // hash password //
    const hashedPassword = await bcrypt.hash(password,10);
    
    //create entry in db //
    const profileDetils = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null, 

    });

    const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        
        accountType,
        contactNumber,
        additionalDetails:profileDetils._id,
        
        image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`


    });

    // return response successfull signup //
    return res.status(200).json({
        success:true,
        message:"User registered successfully...",
        user,
    });

}
 catch(error){
    console.log(error);
     return res.status(500).json({
        success:false,
        message:"Something went wrong..."
     })
   }
}




// =============================================================================
//login
exports.login = async (req,res)  => {
    try{
         //get data from req ki body //
         const {
            email,
            password,
         } = req.body;
         
         //validation of data //
         if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are mandatory...",
            });
         }

         //check user exists or not //
         const user = await User.findOne({email : email}).populate("additionalDetails");
         if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered...",
            });
         }

        //  console.log("User details : ",user);
        //  console.log("User password : ",user.password);
        //  console.log("User password : ",password); // req ki body //jo user input kr rha h

        //  generate JWT token after matching password //
        //  if(await bcrypt.compare(password, user.password)){
        //     const payload = {
        //         email: user.email,
        //         id:user._id,
        //         role:user.accountType,
        //     }
        //     const token = jwt.sign(payload, process.env.JWT_SECRET, {
        //         expiresIn:"24h",
        //     });
        if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

             user.token = token;
             user.password = undefined;
         

         //create cookies and send response //
         const options = {
            expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httponly:true,
         }
         res.cookie("token", token, options).status(200).json({
             success:true,
            token,
            user,
            message:"USer logged in successfully..."
         });
      }

      else{
        return res.status(401).json({
            success:false,
            message:"Password incorrect..."
        });
      }
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"SOmething went wrong...",
        });
    }
}

// ============================================================================================



//ChangePassword
exports.changePassword = async (req, res) => {
    try{
        // get data from request ki body //
        const { email ,
                oldPassword,
                newPassword,
                confirmPassword
        } = req.body;
        // get oldPassword, newPassword, confirmPasswrod//
        //validation //
        const validuser =  await User.findOne({email : email});
        if(!validuser){
            return res.status(402).json({
                success:false,
                message:"mail didn't registered.."
            });
        }

        // match old password with new password //
        const confirm = await User.findOne({email: email});
        if(confirm !== oldPassword){
            return res.status(403).json({
                success:false,
                message:"Password didnt matched..."
            });
        }
        if(newPassword !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Passwords must be same ..."
            });
        }



        const hashedpassword = await bcrypt.hash(newPassword,10)
        // update password in db //
        await User.findOneAndUpdate(
                                    {password : hashedpassword},
                                    {new:true},);


        // send mail -> Password updated //
        //  return response //
        return res.status(200).json({
            success:true,
            message:"Password changed successfully..."
        });

    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Something went wrong ...."
        });
    }
}