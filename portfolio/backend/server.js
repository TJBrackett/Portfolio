// import { createTransport }  from 'nodemailer';
// import express, { json } from 'express';
// import { urlencoded } from 'body-parser';
// import { readFileSync } from 'fs';
// import { createServer } from 'http';
// import { createServer as _createServer } from 'https';
// import mongoose from 'mongoose';
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/tjbrackett.com/privkey.pem', "utf8"),
    cert: fs.readFileSync('/etc/letsencrypt/live/tjbrackett.com/cert.pem', "utf8"),
    ca: fs.readFileSync('/etc/letsencrypt/live/tjbrackett.com/chain.pem', "utf8")
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const subject = req.body.subject;
    const message = req.body.message;
    let mailOptions = "";
    console.log(phone)
    const transporter = nodemailer.createTransport({
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
        text: message + "\nName: " + name + "\nEmail: " + email + "\nPhone: " + phone,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        console.log(Date.now())
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send(req.body);
})

http.createServer(app).listen(8080, () => {
    console.log("Server started on port 8080");
});
https.createServer(options, app).listen(8443, () => {
    console.log("Server started on port 8443");
});
