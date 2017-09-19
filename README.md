## How to develop

1. Create LINE Business account
    * [LINE BUSINESS CENTER](https://business.line.me)
    * Messaging API > Developer Trial

2. Get Access tokens
    * LINE BUSINESS CENTER > Accounts > Your Account > Messaging API > Line Developers
    * Get Channel Access Token

3. (Run code at local)

```
git clone https://github.com/sakkuru/line-bot-nodejs.git
cd line-bot-nodejs
npm install
CHANNEL_ACCESS_TOKEN=... node app.js
```

4. Push the code to Azure Web App
    * Set CHANNEL_ACCESS_TOKEN in Application Setting

5. Bot setting at LINE Developer
    * Add Web App IP address to "Server White list"
    * Set Webhook URL at "Basic information" and click "Verify"

6. Finally, you can access to your bot via QA code
