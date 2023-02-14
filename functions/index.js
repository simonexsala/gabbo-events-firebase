const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gabboevents@gmail.com',
    pass: process.env.gmail.password
  }
});

app.post('/', (req, res) => {
  const payload = req.body;

  if (payload.event_type === 'PAYMENT.SALE.COMPLETED') {
    // Handle the completed payment
    const paymentID = payload.resource.id;
    const amount = payload.resource.amount.total;
    const email = payload.resource.payer.email_address;

    console.log(`Payment of ${amount} completed with ID: ${paymentID}`);

    const mailOptions = {
      from: 'gabboevents@gmail.com',
      to: email,
      subject: 'Prevendita Gabbo Events',
      text: `Your payment of $${amount} has been received and processed with ID: ${paymentID}. Thank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Failed to send email');
      } else {
        console.log(`Email sent: ${info.response}`);
        return res.status(200).send('Payment processed successfully');
      }
    });
  } else {
    // Handle other events, such as payment refunds or disputes
    console.log(`Received event of type: ${payload.event_type}`);

    return res.status(200).send('Event processed successfully');
  }
});

exports.webhook = functions.https.onRequest(app);
