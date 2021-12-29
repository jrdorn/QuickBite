import { sendMail } from "./sendMail.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//prompt for and validate user's email
export let promptMail = (directions) => {
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
        //     const emailRegex =
        //       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        //     emailRegex.test(input);
        // },
        message: chalk.green(
          boxen(`Please enter a valid email address`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
      },
    ])
    .then((recipient) => {
      console.clear();

      //send directions to email
      sendMail(directions, recipient.promptMail);
    });
};
