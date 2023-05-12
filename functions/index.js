const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const qrcode = require('qr-code-styling');
const nodemailer = require('nodemailer');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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

  if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
    const db = admin.firestore();
    const amount = body.resource.purchase_units[0].amount.value;
    const description = body.resource.purchase_units[0].description;
    const descriptionParts = description.split(' ');
    const type = descriptionParts[descriptionParts.length - 1];
    const quantity = parseInt(descriptionParts[descriptionParts.length - 2]);
    
    const email = body.resource.payer.email_address;
    const name = body.resource.payer.name;
    const time = body.resource.update_time;

    db.collection('evento').doc(body.id).set({
      data: time,
      email: email,
      nome: name,
      numero: quantity,
      tipo: type,
      totale: amount
    });

    sendEmailWithQRCode(body.id, email, name.given_name, amount);
  } else {
    console.log(`Received event of type: ${body.event_type}`);
    return res.status(200).send('Event processed successfully');
  }
});

async function sendEmailWithQRCode(id, email, name, amount) {
  try {
    const qrCode = new qrcode({
      width: 400,
      height: 400,
      data: id, 
      image: "https://drive.google.com/file/d/1RI57_z0ouydGZRDEwdLkwuhM7XtusDBK/view?usp=sharing",
      imageOptions: {
        margin: 2,
      },
      dotsOptions: {
          color: "#E4256E",
          type: "extra-rounded"
      },
    });

    const imageBuffer = await qrCode.toBuffer();
    const mailOptions = {
      from: 'gabbo.dorigoni@gmail.com',
      to: email,
      subject: 'Prevendita Gabbo Events',
      text: `Ciao ${name}, abbiamo ricevuto il tuo pagamento di €${amount}.`,
      attachments: [
        {
          filename: 'qrcode.png',
          content: imageBuffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      cleanup();
      if (error) {
        console.log(error);
        return res.status(500).send('Failed to send email');
      } else {
        console.log(`Email sent: ${info.response}`);
        return res.status(200).send('Payment processed successfully');
      }
    });
  } catch(error) {
    console.error('Error sending email:', error);
  }
}

exports.webhook = functions.https.onRequest(app);
