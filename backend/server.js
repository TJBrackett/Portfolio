const http = require("http");
const nodemailer = require("nodemailer");



http.createServer ((req, res) => {
    console.log('Server created.');
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('Hello World!');
}).listen(8888);

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'brackett.tj@gmail.com',
        pass: 'kosmysmpgdvklzrx'
    }
});

let mailOptions = {
    from: '',
    to: 'tj@brackett.dev',
    subject: '',
    text: '',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});