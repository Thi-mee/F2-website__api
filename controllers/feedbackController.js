const Mailer = require('../services/mailingService');
require("dotenv").config()

const mailer = new Mailer(
    process.env.EMAIL_HOST,
    process.env.EMAIL_USERNAME,
    process.env.EMAIL_PASSWORD,
    process.env.EMAIL_SOURCE
);


const sendFeedback = async (req, res, next) => {
    const baseUrl = process.env.CLIENT_URL ?? ""
    try {
        const {fullName, email, message} = req.body
        await mailer.sendEmail(
            'feedbackTemplate',
            { fullName, email, message, baseUrl },
            process.env.CONTACT_EMAIL
        );
        res.status("200").json({
            status: true,
            message: "Feedback sent successfully"
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {sendFeedback}