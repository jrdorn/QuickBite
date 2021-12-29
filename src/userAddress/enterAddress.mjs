import { confirmAddress } from "./confirmAddress.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//prompt user to enter their address
export let enterAddress = () => {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: "input",
        name: "enterAddress",
        prefix: "",
        suffix: "\n\n\n",
        message: chalk.green(
          boxen(
            `Please enter a valid US address in the following format:\n\n(street, city, state)`,
            {
              borderStyle: "round",
              padding: 1,
            }
          )
        ),
      },
    ])
    .then((answer) => {
      console.clear();
      confirmAddress(answer.enterAddress);
    });
};
