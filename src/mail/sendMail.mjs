import { viewSaveSend } from "../restaurants/viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";

import express from "express";
import inquirer from "inquirer";
import nodemailer from "nodemailer";

//send directions via email or SMS
export let sendMail = (
  directions,
  recipient,
  originCoords,
  selectedRestaurant,
  restaurants
) => {
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
      secure: true,
      auth: {
        user: email,
        pass: pw,
      },
    });

    //send mail to user's contact
    await transporter.sendMail({
      from: `"QuickBite" ${email}`,
      to: `${recipient}`,
      subject: `Directions to restaurant`,
      text: `${directions}`,
    });
  })()
    .catch((err) => {
      console.error(
        chalk.red(boxen(`Error: ${err}`, { padding: 1, borderStyle: "round" }))
      );
      process.exit(0);
    })
    .then(() => {
      //display success and return to menu

      inquirer
        .prompt([
          {
            type: "list",
            name: "sendMail",
            prefix: "",
            suffix: "\n",
            message: chalk.green(
              boxen(`Directions sent to ${recipient}`, {
                borderStyle: "round",
                padding: 1,
              })
            ),
            choices: ["Return"],
          },
        ])
        .then(() => {
          console.clear();
          viewSaveSend(originCoords, selectedRestaurant, restaurants);
        });
    });
};
