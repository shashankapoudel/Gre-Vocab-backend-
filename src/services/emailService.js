const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS

    }
})

const sendWelcomeEmail=async(userEmail)=>{
    try{
        const mailOptions={

            from:"shashankaozil@gmail.com",
            to:userEmail,
            subject: "Thank you for registering",
            text:"Thank you for registering in our app. We are excited to have you!",
            html:"<h2>Welcome to Our App</h2><p>Thank you for registering in our app. We are excited to have you!</p>"
        }
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully.');
    }catch (error) {
        console.error('Error sending email:', error);
    }
}
module.exports = { sendWelcomeEmail };
