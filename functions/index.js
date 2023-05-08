const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const functions = require('firebase-functions');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'gabbo.dorigoni@gmail.com',
    pass: 'xdqrgbbdlvcibugr',
  },
});

app.post('/', (req, res) => {
  const body = req.body;
  console.log(JSON.stringify(body));

  console.log(body.event_type);

  if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
    // const amount = body.purchase_units.amount.value;
    const amount = 20;
    // const description = body.purchase_units.description;
    let numero = 1;
    let tipo = 'ingresso';

    if (amount > 19) {
      numero = 'XXX';
      tipo = 'XXX';
    }

    // const email = body.resource.payer.email_address;
    const email = "simonexsala@gmail.com"
    const firstName = body.resource.payer.name.given_name;
    const lastName = body.resource.payer.name.surname;

    const db = getFirestore();
    db.collection('evento').add({
      nome: firstName,
      cognome: lastName,
      email: email,
      numero: numero,
      tipo: tipo,
      totale: amount,
    });

    const mailOptions = {
      from: 'gabboevents@gmail.com',
      to: email,
      subject: 'Prevendita Gabbo Events',
      text: `Ciao ${firstName}, abbiamo ricevuto il tuo pagamento di €${amount} per`
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
    console.log(`Received event of type: ${body.event_type}`);
    return res.status(200).send('Event processed successfully');
  }
});

exports.webhook = functions.https.onRequest(app);
