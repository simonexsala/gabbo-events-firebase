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
    // console.log(JSON.stringify(body));

    if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
      const db = admin.firestore();

      // const email = "simonexsala@gmail.com";
      const shortCode = body.slice(-6);
      const email = body.resource.payer.email_address;
      const name = body.resource.payer.name;
      const time = body.resource.update_time;
      const amount = body.resource.purchase_units[0].amount.value;
      const [quantity, type] = body.resource.purchase_units[0].description.split(' ').slice(-2);
      // const capitalizedType = type.charAt(0).toUpperCase();
      // const qrCodeBody = `${body.id}-I${quantity}-T${capitalizedType}`;
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
        numero: quantity,
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
      // await db.collection('mail').doc(body.id).set({
      //   to: email,
      //   template: {
      //     name: "lista",
      //     data: {
      //       nome: name.given_name,
      //       numero: quantity,
      //     },
      //   },
      // });
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
