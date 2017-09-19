// import modules
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');

// create a new express server
const app = express();

// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
  });
  
app.post('/message', (req, res) => {

    console.log('Received Post with the following message body:');

    console.log(JSON.stringify(req.body));

    const message = {
        type: 'text',
        text: 'Hello User. You said ' + req.body.events[0].message.text
      };
    
    console.log('Send response through line client sdk');

    client.replyMessage(req.body.events[0].replyToken, message)
    .then(() => {
        console.log('Reply send, returning OK');
    })
    .catch((err) => {
      // error handling
      console.log('Error sending reply message' + err);
    });

    res.send('OK');
});

// Top page access
app.get('/', (req, res) => {
    const innerText = `
  <body>
  <script>
  document.body.innerText = Endpoint is location.href + 'message';
  </script>
  </body>
  `;

    res.send(innerText);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});