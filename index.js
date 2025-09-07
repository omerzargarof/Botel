const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const message = req.body?.body?.messageData?.textMessageData?.textMessage;
  const chatId = req.body?.body?.senderData?.chatId;
  console.log('📩 התקבלה הודעה:', JSON.stringify(req.body, null, 2));


 // if (message && message.includes('היי')) {
    await axios.post(`https://api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.TOKEN}`, {
      chatId,
      message: 'היי עומר! איך אפשר לעזור?'
    });
  //}

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Bot is running on Render');
});