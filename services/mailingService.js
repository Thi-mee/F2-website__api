const nodeMailer = require('nodemailer');
const Email = require('email-templates'); // You need to import the actual 'email-templates' package
const path = require('path');
const logger = require("../lib/logger");

class Mailer {
    /**
     *
     * @param {string} emailHost
     * @param {string} emailUsername
     * @param {string} emailPassword
     * @param {string} emailSource
     */
    constructor(emailHost, emailUsername, emailPassword, emailSource) {
        this.transporter = nodeMailer.createTransport({
            host: emailHost,
            port: 587,
            secure: false,
            auth: {
                user: emailUsername,
                pass: emailPassword,
            },
        });
        this.email = new Email({
            message: emailSource,
            views: {
                root: path.join(__dirname, "../lib/email-templates"),
                options: { extension: 'ejs' },
            },
            transport: this.transporter,
            send: true,
            preview: {
                open: {
                    app: 'firefox',
                    wait: false,
                },
                
            },
            juiceResources: {
                preserveImportant: true,
                webResources: {
                    relativeTo: path.join(__dirname, "../lib/email-templates"),
                },
            },
        });
    }

    /**
     *
     * @param {string} templateName
     * @param {object} data
     * @param {string} recipient
     * @returns {Promise<void>}
     */
    async sendEmail(templateName, data, recipient) {
        try {
            const emailOptions = {
                template: templateName,
                message: {
                    to: recipient,
                },
                locals: data,
            };

            await this.email.send(emailOptions);
            console.log(`Email sent successfully to ${recipient}`);
        } catch (error) {
            console.error(error);
            logger.error(error.message)
            const err = new Error("An error occurred. Try again later");
            err.status(500)
            throw err
        }
    }
}

module.exports = Mailer;