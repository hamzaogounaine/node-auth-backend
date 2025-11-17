const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // Mailtrap often uses STARTTLS on port 2525/587, so this is false
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
})

const sendVerificationLink = async (to , subject , body) => {
    console.log('sendign email')

    try {
        const info = await transporter.sendMail({
            from : 'authapp@superstuff.online',
            to : to,
            subject : subject,
            html : body
        })
        console.log('Email has been sent' , info)
        return true
    }
    catch (err) {
        console.log('Error sending mail' , err)
        return false
    }

}

module.exports = {sendVerificationLink}