// const nodemailer = require("nodemailer");
// require("dotenv").config()

// const mailSender = async (email,title,body) => {
//     try{
//         let transporter = nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             auth:{
//                 user: process.env.MAIL_USER,
//                 pass: process.env.HOST_PASS,
//             }
//         })

//         // function to send mail //
//         let info = await transporter.sendMail({
//             form: 'StudyNotion || Codehelp - by sahil jain',
//             to: `${email}`,
//             subject: `${title}`,
//             html: `${body}`,
//         })

//         console.log(info);
//         return info;
//     } 
//     catch(error){
//         console.log(error.message);
//     }
// }

// module.exports = mailSender;

const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,  // Common SMTP port; adjust if your service uses a different one
            secure: false, // Set to true if using port 465, usually for secure SMTP
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.HOST_PASS,
            }
        });

        // Function to send mail
        let info = await transporter.sendMail({
            from: 'StudyNotion || Codehelp - by Sahil Jain <your-email@example.com>', // replace with a valid email
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,  // Using HTML content for the email
        });

        console.log("Email sent:", info.response);
        return info;
    } 
    catch (error) {
        console.log("Error sending email:", error.message);
    }
};

module.exports = mailSender;
