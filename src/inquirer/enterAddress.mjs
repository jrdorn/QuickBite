import { confirmAddress } from "./confirmAddress.mjs";
import chalk from "chalk";
import inquirer from "inquirer";

//prompt user to enter their address
export let enterAddress = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "enterAddress",
        message: chalk.green(
          "Please enter a valid US address in the following format:\n\n(street, city, state)\n\n"
        ),
      },
    ])
    .then((answer) => {
      //
      console.clear();
      //
      confirmAddress(answer.enterAddress);
    });
};
