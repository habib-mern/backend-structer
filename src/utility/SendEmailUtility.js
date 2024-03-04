const nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailSubject, EmailText)=>{
   
    //creat a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service:"Gmail",
        auth: {
          user: "ufacts240@gmail.com",
          pass: "zeas jkjp ehfa vher",
        },
      });
    //The Email Message
      let mailOptions = {
        from: '"To-Do-Lister" <ufacts240@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
      }
      return await transporter.sendMail(mailOptions)
}
module.exports = SendEmailUtility