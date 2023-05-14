const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const QRCode = require('qrcode');
const nodemailer = require('nodemailer');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  const body = req.body;
  // console.log(JSON.stringify(body));

  if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
    const db = admin.firestore();
    const amount = body.resource.purchase_units[0].amount.value;
    const description = body.resource.purchase_units[0].description;
    const descriptionParts = description.split(' ');
    const type = descriptionParts[descriptionParts.length - 1];
    const quantity = parseInt(descriptionParts[descriptionParts.length - 2]);
    
    const email = "simonexsala@gmail.com";
    // const email = body.resource.payer.email_address;
    const name = body.resource.payer.name;
    const time = body.resource.update_time;

    db.collection('evento').doc(body.id).set({
      data: time,
      email: email,
      email_sent: false,
      nome: name,
      numero: quantity,
      tipo: type,
      totale: amount
    });

    sendEmailWithQRCode(body.id, email, name.given_name, amount, quantity);
  } else {
    console.log(`Received event of type: ${body.event_type}`);
  }

  return res.status(200).send('Event processed successfully');
});

async function sendEmailWithQRCode(id, email, name, amount, quantity) {
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.9,
    margin: 1,
    width: 500,
    height: 500,
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'gabbo.dorigoni@gmail.com',
      pass: 'xdqrgbbdlvcibugr',
    },
    tls: {
      ciphers : 'SSLv3',
    },
  });

  const url = await QRCode.toDataURL(id, opts);
  const mailOptions = {
    from: 'gabbo.dorigoni@gmail.com',
    to: email,
    subject: 'Prevendita Gabbo Events',
    text: `Ciao ${name}, abbiamo ricevuto il tuo pagamento di €${amount} per ${quantity} ingressi. Il QR code che hai ricevuto allegato a questo messaggio è valido per ${quantity} ingressi.`,
    attachments: [
      {
        path: url,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Failed to send email');
    } else {
      console.log(`Email sent: ${info.response}`);
      admin.firestore().collection("evento").doc(id).update({ email_sent: true });
      return res.status(200).send('Payment processed successfully');
    }
  });
}

exports.webhook = functions.https.onRequest(app);
