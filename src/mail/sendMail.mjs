import { viewSaveSend } from "../restaurants/viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import fetch from "node-fetch";
import inquirer from "inquirer";

//send directions via email or SMS
export let sendMail = (
  directions,
  recipient,
  originCoords,
  selectedRestaurant,
  restaurants
) => {
  fetch(`https://quickbite-server.herokuapp.com/send-mail`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ directions: directions, recipient: recipient }),
  })
    .then((res) => res.json())
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
