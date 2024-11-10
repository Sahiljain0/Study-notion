const nodemailer = require("nodemailer");
require("dotenv").config()

const mailSender = async (email,title,body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.HOST_PASS,
            }
        })

        // function to send mail //
        let info = await transporter.sendMail({
            form: 'StudyNotion || Codehelp - by sahil jain',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        console.log(info);
        return info;
    } 
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;


// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const mailSender = async (email, title, body) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             port: 587,  // or 465 if using SSL
//             secure: false,  // set to true for port 465
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.HOST_PASS,
//             }
//         });

//         // Function to send mail
//         let info = await transporter.sendMail({
//             from: 'StudyNotion || Codehelp - by Sahil Jain <dummypaper420@gmail.com>',  // Update with a valid email
//             to: email,
//             subject: title,
//             html: body,
//         });

//         console.log("Email sent:", info.messageId);
//         return info;
//     } 
//     catch (error) {
//         console.log("Error sending email:", error.message);
//         throw error; // Optional: re-throw error for handling in calling function
//     }
// };

// module.exports = mailSender;
