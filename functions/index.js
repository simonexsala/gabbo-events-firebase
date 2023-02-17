const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
  const headers = req.headers;
  const body = req.body;

  // Verify PayPal signature
  // add to .env.local
  const PAYPAL_WEBHOOK_ID = '<your_paypal_webhook_id>';
  const PAYPAL_API_SECRET = '<your_paypal_api_secret>';

  const signature = headers['paypal-signature'];
  const verificationData = JSON.stringify(body);
  const expectedSignature = crypto.createHmac('sha256', PAYPAL_API_SECRET)
                                  .update(verificationData)
                                  .digest('hex');

  if (signature !== expectedSignature) {
    console.error('PayPal signature verification failed.');
    return res.status(401).send('Unauthorized request');
  }

  if (body.event_type === 'PAYMENT.SALE.COMPLETED') {
    const paymentID = body.resource.id;
    const amount = body.resource.amount.total;
    const email = body.resource.payer.email_address;

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
    console.log(`Received event of type: ${body.event_type}`);

    return res.status(200).send('Event processed successfully');
  }
});


exports.webhook = functions.https.onRequest(app);
