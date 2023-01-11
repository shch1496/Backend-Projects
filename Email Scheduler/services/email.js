const { Module } = require("module");
const nodemailer = require("nodemailer");
const { USER_EMAIL, USER_PASSWORD } = require("../config/credentials");

//Using gmail smtp server
const SMTP_PORT = 465;
const HOST_SERVICE = "smtp.gmail.com";

const SENDER_EMAIL = USER_EMAIL;
const RECEIVER_EMAIL = "shch14@outlook.com";

const CC = [];
const BCC = [];

const EMAIL_SUBJECT = "Testing Email Scheduler";
const EMAIL_BODY_HTML = "<h1>Testing Google SMTP service</h1>";

const options = {
    from: SENDER_EMAIL,
    to: RECEIVER_EMAIL,
    cc: CC,
    bcc: BCC,
    subject: EMAIL_SUBJECT,
    html: EMAIL_BODY_HTML
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: HOST_SERVICE,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
})

module.exports = { transporter, options }