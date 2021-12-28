import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//prompt for and validate user's email/ phone number
export let promptMail = (type) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "promptMail",
        prefix: "",
        suffix: "\n",
        validate: (input) => {
          //
          //validate user input and reprompt if invalid
          //
          if (type === "email address") {
            const emailRegex =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            emailRegex.test(input);
          } else if (type === "phone number") {
            const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
            phoneRegex.test(input);
          }
        },
        message: chalk.green(
          boxen(`Please enter a valid ${type}`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
      },
    ])
    .then((input) => {
      console.clear();
      console.log(input);
    });
};

/**
 * if phone number, have user choose provider first
 */

/**
 * prompt for user email/ phone number and validate it
 */
