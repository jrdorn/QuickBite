import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//prompt for and validate user's email/ phone number
export let promptMail = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "promptMail",
        prefix: "",
        suffix: "\n",
        message: chalk.green(
          boxen(`Please enter a valid (email address | phone number)`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
        choices: myRest.choices,
      },
    ])
    .then((answer) => {
      console.clear();
    });
};

/**
 * if phone number, have user choose provider first
 */

/**
 * prompt for user email/ phone number and validate it
 */
