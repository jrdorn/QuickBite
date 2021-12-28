import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

//send directions via email or SMS
export let sendMail = (directions) => {
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
      to: "jr_dorn@yahoo.com",
      subject: `Directinos to ${RADARADA}`,
      text: `${rada}`,
      // html: "<b>Gm to you</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  })().catch(console.error);
};
