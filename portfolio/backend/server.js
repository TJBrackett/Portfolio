const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
// const httpProxy = require('http-proxy');
const app = express();

// const proxy = "";
const options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem')
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/emailer', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;
    let mailOptions = "";
    console.log(req.body);
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'emailbot9521@gmail.com',
            pass: 'jsfoffamlhqzfqnu'
        }
    });
    if (req.hostname === "https://www.tjbrackett.com/"){
        mailOptions = {
            from: email,
            to: 'brackett.tj@gmail.com',
            subject: subject,
            text: message + "\nName: " + name + "\nEmail: " + email,
        };
        console.log(req.hostname);
    } else {
        mailOptions = {
            from: email,
            to: 'joemark1989@gmail.com',
            subject: subject,
            text: message + "\nName: " + name + "\nEmail: " + email,
        }
        console.log(req.hostname);
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
    res.send(req.body);
})



// httpProxy.createServer({
//     target: {
//         host: 'myemailbot.tk',
//         port: '80'
//     },
//     ssl: {
//         key: fs.readFileSync(__dirname + '/key.pem', 'utf8'),
//         cert: fs.readFileSync(__dirname + '/cert.pem', 'utf8')
//     }
//   }).listen(8888);

// app.set('port' ,(process.env.PORT || 9521));
http.createServer(app).listen(8080, () => {
    console.log("Server started on port 8080");
});
https.createServer(options, app).listen(8443, () => {
    console.log("Server started on port 8443");
});
