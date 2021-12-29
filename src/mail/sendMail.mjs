import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

//send directions via email or SMS
export let sendMail = (directions, recipient) => {
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
  app.listen(port, () => {});

  //SMTP transporter
  (async () => {
    //create transport object with origin address
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: email,
        pass: pw,
      },
    });

    //send mail to user's contact
    let info = await transporter.sendMail({
      from: `"QuickBite" ${email}`,
      to: `${recipient}`,
      subject: `Directions to restaurant`,
      text: `${directions}`,
    });

    console.log("Message sent: %s", info.messageId);
  })().catch(console.error);
};
