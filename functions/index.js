const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const QRCode = require('qrcode');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  try {
    const body = req.body;

    if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
      const time = body.resource.update_time;

      // Only proceed if time is not null or undefined
      if (!time) {
        console.log('No update_time provided, skipping database writes.');
        return res.status(200).send('No time provided, skipped DB write.');
      }

      const db = admin.firestore();

      const shortCode = body.id.slice(-6);
      const email = body.resource.payer.email_address;
      const name = body.resource.payer.name;
      const amount = body.resource.purchase_units[0].amount.value;
      const [quantity, type] = body.resource.purchase_units[0].description.split(' ').slice(-2);
      const qrCodeBody = body.id;

      const qrCode = await generateQRCode(qrCodeBody);

      await db.collection('evento').doc(body.id).set({
        code: qrCode,
        shortCode: shortCode,
        data: time,
        email: email,
        nome: name,
        numero: quantity,
        tipo: type,
        totale: amount,
      });

      await db.collection('ingressi').doc(body.id).set({
        shortCode: shortCode,
        email: email,
        quantity: quantity,
        used: 0,
      });

      await db.collection('mail').doc(body.id).set({
        to: email,
        template: {
          name: "prevendita",
          data: {
            nome: name.given_name,
            numero: quantity,
            shortCode: shortCode,
            path: qrCode,
          },
        },
      });
    } else {
      console.log(`Received event of type: ${body.event_type}`);
    }

    return res.status(200).send('Event processed successfully.');
  } catch (error) {
    console.error('Error processing event:', error);
    return res.status(500).send('Error processing event.');
  }
});

async function generateQRCode(qrCodeBody) {
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.9,
    margin: 1,
    width: 500,
    height: 500,
  }

  const url = await QRCode.toDataURL(qrCodeBody, opts);
  return url;
}

exports.webhook = functions.https.onRequest(app);
