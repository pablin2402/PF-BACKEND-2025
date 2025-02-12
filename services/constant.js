const nodemailer = require('nodemailer')
const {google} = require ('googleapis')

const CLIENT_ID='714964605525-v5pmhjc84usbtp57bg254rt84bks8mvr.apps.googleusercontent.com'
const CLIENT_SECRET='714964605525-v5pmhjc84usbtp57bg254rt84bks8mvr.apps.googleusercontent.com'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='ya29.a0AWY7Ckk1DyiGFBREs0bUhnZ-VTdTbiifCEuTp7Jm4KhWq7mT-QAxX_nooizeY0GyB0z7IUrbSuQkSlvI7HPmjIG_TH4Erok4VEY60xGiEgE0tQ4Nl_C1GooOR9tnduxTyiB4CUdxAwgkePQQawRi3TvNj-9GaCgYKAe4SARESFQG1tDrpLJBWWcGnk9mtW3IOVFf4EA0163'

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'yours authorised email address',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'Pablo Rivas <pabloperedo04@gmail.com>',
        to: 'pabloperedo04@gmail.com',
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: '<h1>Hello from gmail email using API</h1>',
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }