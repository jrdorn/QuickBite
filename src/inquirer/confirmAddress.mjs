import { enterAddress } from "./enterAddress.mjs";
import { validateAddress } from "./validateAddress.mjs";
import chalk from "chalk";
import inquirer from "inquirer";

//confirm if user wants to proceed with the entered address, or if they want to go back and change it
export let confirmAddress = (addr) => {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: "list",
        name: "confirmAddress",
        message: chalk.green(`You entered: ${addr}\n\nIs that your address?\n`),
        choices: ["Yes", "No"],
      },
    ])
    .then((answer) => {
      //
      console.clear();
      //
      if (answer.confirmAddress === "Yes") {
        //validate input address
        validateAddress(addr);
      } else {
        console.log("\n");
        //prompt to reenter address
        enterAddress();
      }
    });
};
