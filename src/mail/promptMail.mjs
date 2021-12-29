import { sendMail } from "./sendMail.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

//prompt for and validate user's email
export let promptMail = (
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
        type: "input",
        name: "promptMail",
        prefix: "",
        suffix: "\n",
        validate: (input) => {
          //
          //
          //ensure valid email address is entered
          return new Promise((resolve, reject) => {
            console.clear();

            const emailRegex =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

            if (emailRegex.test(input) === false) {
              reject(
                console.error(
                  "Invalid input: please enter a valid email address"
                )
              );
            } else {
              resolve(true);
            }
          });
        },
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
      sendMail(
        directions,
        recipient.promptMail,
        originCoords,
        selectedRestaurant,
        restaurants
      );
    });
};

/**
 * validate email
 * ora spinner, or another animation while sendMail processing
 */

//
// const spinner = ora({ spinner: "flip" }).start();
// const spinThis = setTimeout(() => {
//   spinner.color = "green";
// }, 1000);
//
