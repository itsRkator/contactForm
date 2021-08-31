const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 8200;

// Middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactfrom.html');

})
app.post('/', (req, res) => {
    console.log("Req.body", req.body);

    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "rohitashkator9549038757@gmail.com",
            pass: "Parabolaloveskalpana"
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'itsrkator@gmail.com',
        subject: `Message Received from ${req.body.email}: ${req.body.subject}`,
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
    console.log('Server is running on port ', PORT);
})