const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy-middleware');
const app = express();

const options = {
    key: fs.readFileSync(__dirname + 'key.pem'),
    cert: fs.readFileSync(__dirname + 'cert.pem')
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;
    console.log(req.body);
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'emailbot9521@gmail.com',
            pass: 'jsfoffamlhqzfqnu'
        }
    });
    
    let mailOptions = {
        from: email,
        to: 'brackett.tj@gmail.com, joemark1989@gmail.com',
        subject: subject,
        text: message + "\nName: " + name + "\nEmail: " + email,
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

app.set('port' ,(process.env.PORT || 443 || 80));
app.createServer(options, app).listen(app.get('port'), () => {
        console.log("Server started on port " + app.get('port'));
});
