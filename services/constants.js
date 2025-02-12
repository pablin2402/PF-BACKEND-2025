require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: "sid.cd.varma@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "pabloperedo04@gmail.com",
  to: "pabloperedo04@gmail.com",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};