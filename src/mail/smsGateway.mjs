import { promptMail } from "./promptMail.mjs";
import { viewSaveSend } from "../restaurants/viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//have user select supported service provider
export let smsGateway = (
  directions,
  originCoords,
  selectedRestaurant,
  restaurants
) => {
  console.clear();
  console.log("\n");
  inquirer
    .prompt([
      {
        type: "list",
        name: "smsGateway",
        prefix: "",
        suffix: "\n",
        message: chalk.green(
          boxen(
            `Please select one of the supported service providers\n(message and data rates may apply)`,
            {
              borderStyle: "round",
              padding: 1,
            }
          )
        ),
        choices: [
          "Verizon",
          "Sprint",
          "AT&T",
          "T-Mobile",
          "MetroPCS",
          "Boost Mobile",
          "Virgin Mobile",
          "US Cellular",
          "Return to menu",
        ],
      },
    ])
    .then((answer) => {
      console.clear();

      //save SMS gateway to format phone number
      let gateway;
      if (answer.smsGateway === "Verizon") {
        gateway = "@vtext.com";
      } else if (answer.smsGateway === "Sprint") {
        gateway = "@messaging.sprintpcs.com";
      } else if (answer.smsGateway === "AT&T") {
        gateway = "@txt.att.net";
      } else if (answer.smsGateway === "T-Mobile") {
        gateway = "@tmomail.net";
      } else if (answer.smsGateway === "MetroPCS") {
        gateway = "@mymetropcs.com";
      } else if (answer.smsGateway === "Boost Mobile") {
        gateway = "@sms.myboostmobile.com";
      } else if (answer.smsGateway === "Virgin Mobile") {
        gateway = "@vmobl.com";
      } else if (answer.smsGateway === "US Cellular") {
        gateway = "@email.uscc.net";
      } else if (answer.smsGateway === "Return to menu") {
        viewSaveSend(originCoords, selectedRestaurant, restaurants);
      }
      //prompt user for their phone number
      promptMail(directions, "phone number", gateway);
    });
};
