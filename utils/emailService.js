const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");


// Load environment variables from .env file
dotenv.config();


// Function to send an email
function sendEmail(sender, recipient, subject, templateName, data,bccList = []) {
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user:  process.env.EMAIL_USER,
            pass:  process.env.EMAIL_PASSWORD
        }
    });

    // Load the EJS template
    const templatePath = path.join(__dirname, '../views/mail', `${templateName}.ejs`);
    const template = fs.readFileSync(templatePath, 'utf8');

    // Render the EJS template with data
    const renderedTemplate = ejs.render(template, {data});
    console.log(data);

    // Mail options
    let mailOptions = {
        from: sender,
        to: recipient,
        subject: subject,
        html: renderedTemplate, // Use HTML instead of text for EJS template
        bcc: bccList.join(',') // Convert array of BCC recipients to comma-separated string
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
        } else {
            console.log('Email sent successfully:', info.messageId);
        }
    });
}

module.exports = sendEmail;
