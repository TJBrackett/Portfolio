import { createTransport } from 'nodemailer';
import express, { json } from 'express';
import { urlencoded } from 'body-parser';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { createServer as _createServer } from 'https';
import mongoose from 'mongoose';
const app = express();

const options = {
    key: readFileSync('/etc/letsencrypt/live/tjbrackett.com/privkey.pem', "utf8"),
    cert: readFileSync('/etc/letsencrypt/live/tjbrackett.com/cert.pem', "utf8"),
    ca: readFileSync('/etc/letsencrypt/live/tjbrackett.com/chain.pem', "utf8")
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(urlencoded({ extended: true }));
app.use(json());

app.post('/email', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let subject = req.body.subject;
    let message = req.body.message;
    let mailOptions = "";

    let transporter = createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'emailbot9521@gmail.com',
            pass: 'jsfoffamlhqzfqnu'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    mailOptions = {
        from: email,
        to: 'brackett.tj@gmail.com',
        subject: subject,
        text: message + "\nName: " + name + "\nEmail: " + email + "\nPhone: " + phone
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send(req.body);
})

createServer(app).listen(8080, () => {
    console.log("Server started on port 8080");
});
_createServer(options, app).listen(8443, () => {
    console.log("Server started on port 8443");
});
