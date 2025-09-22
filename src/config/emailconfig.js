const nodemailer = require("nodemailer");
const {GMAIL_PASS,GMAIL} = require ("./server-config");

const mailSender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL,
        pass: GMAIL_PASS
    }
});

module.exports = mailSender;
