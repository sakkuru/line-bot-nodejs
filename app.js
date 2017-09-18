// import modules
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

// create a new express server
const app = express();

// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/message', (req, res) => {

    // reply text    
    const message = [{
        type: 'text',
        text: 'Your message: ' + req.body.events[0].message.text,
    }];

    const options = {
        method: 'POST',
        uri: 'https://api.line.me/v2/bot/message/reply',
        body: {
            replyToken: req.body.events[0].replyToken,
            messages: message,
        },
        auth: {
            bearer: process.env.CHANNEL_ACCESS_TOKEN,
        },
        json: true
    };

    console.log(options);
    console.log('------------------------');

    request(options, (err, response, body) => {
        console.log(JSON.stringify(response));
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