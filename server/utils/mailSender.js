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