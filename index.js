const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json())

app.use(cors());

app.get('/', cors(), (req, res) => {
    // res.send(`<p>Server is Running.</p>`)
    res.sendFile(__dirname + '/public/templates/index.html');
})
app.post('/send-mail', cors(), (req, res) => {
    console.log("Req.body", req.body);

    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "sender-email@gmail.com",
            pass: "password-sender-email"
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'receiver-mail',
        subject: `New message Received from ${req.body.name}(${req.body.email}): ${req.body.subject}`,
        text: req.body.message
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('error');
        } else {
            console.log("Email send: " + info.response)
            res.send("Success");
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
