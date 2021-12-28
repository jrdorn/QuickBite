#!/usr/bin/env node

import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

//get email credentials from env
const config = dotenv.config();
if (config.error) {
  throw config.error;
}
const email = config.parsed.UNAME;
const pw = config.parsed.APP_PW;

//initialize server
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

//
async function main() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: email,
      pass: pw,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"QuickBite" ${email}`, // sender address
    to: "jr_dorn@yahoo.com", // list of receivers
    subject: "Gm world", // Subject line
    text: "Gm to you", // plain text body
    html: "<b>Gm to you</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
