const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")
const OTPSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    creation:{
        type:Date,
        default:Date.now(),
        expires:5*60,       // the otp will get delete fater 5 minutes fro db automatically //
     }
});

// a function -> to send emails

async function sendVerificationEmail(email,otp){
    try{

        const mailResponse = await mailSender(email, "Verification Email from STudyNotion", otp);
        console.log("Email sent successfully ", mailResponse);
    }
    catch(error){
        console.log("error accured while sending otp :", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);


//pre middleware is used to send otp to the user
// before creating its entity in the db
// to verify the user 
// so before creating the entity we are sending
// verification otp with the help of 
//pre middleware