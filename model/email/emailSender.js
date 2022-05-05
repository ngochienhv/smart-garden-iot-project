var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ngochien123hv@gmail.com',
        pass: 'nipuhsmjxvhlsfbc'
    }
});

module.exports = transporter;


