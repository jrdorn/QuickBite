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
    from: `${email}`, // sender address
    to: "jr_dorn@yahoo.com", // list of receivers
    subject: "Gm", // Subject line
    text: "Gm world", // plain text body
    html: "<b>Gm world</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
