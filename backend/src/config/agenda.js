const Agenda = require('agenda');
const nodemailer = require('nodemailer');
require('dotenv').config();

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

agenda.define('send email', async (job) => {
    const { to, subject, text } = job.attrs.data;
    try {
        await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
});

(async () => await agenda.start())();

module.exports = agenda;
