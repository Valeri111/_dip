const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        pool: true,
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'webworld.company@mail.ru',
            pass: 'eWAPPvij3QN5hfH'
        }
    },
    {
        from: 'Mailer Test <webworld.company@mail.ru>',
    }
);

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer