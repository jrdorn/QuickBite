import { sendMail } from "./sendMail.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//prompt for and validate user's email/ phone number
export let promptMail = (directions, type, gateway) => {
  console.clear();
  console.log("\n");
  inquirer
    .prompt([
      {
        type: "input",
        name: "promptMail",
        prefix: "",
        suffix: "\n",
        // validate: (input) => {
        //   //
        //   //validate user input and reprompt if invalid
        //   //
        //   if (type === "email address") {
        //     const emailRegex =
        //       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        //     emailRegex.test(input);
        //   } else if (type === "phone number") {
        //     const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        //     phoneRegex.test(input);
        //   }
        // },
        message: chalk.green(
          boxen(`Please enter a valid ${type}`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
      },
    ])
    .then((recipient) => {
      console.clear();

      //add SMS gateway if user entered a phone number
      if (gateway) {
        recipient.promptMail += gateway;
      }

      //send directions to email or phone
      sendMail(directions, recipient.promptMail);
    });
};
