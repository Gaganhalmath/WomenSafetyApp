const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = 'ACdc1eef8c459146b961d784fc72615fc4';
const authToken = '8531d4b24a5d4e93630f3e89fd1f9314';
const client = new twilio(accountSid, authToken);

router.post('/send-alert', async (req, res) => {
  const { contacts } = req.body;

  try {
    contacts.forEach(contact => {
      // Send SMS
      client.messages.create({
        body: "I am in Danger!! Please help me immediately.",
        from: '+14155238886',
        to: contact.phone
      });

      // Trigger missed call
      client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml',
        to: contact.phone,
        from: '+14155238886'
      });

      // Send WhatsApp message
      client.messages.create({
        body: "I am in Danger!!",
        from: 'whatsapp:+14155238886',  // Twilio’s official WhatsApp number
        to: `whatsapp:${contact.phone}`
      });
    });

    res.status(200).send({ message: 'SOS Alert Sent!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send alerts' });
  }
});

module.exports = router;
