import { enterAddress } from "./enterAddress.mjs";
import { validateAddress } from "./validateAddress.mjs";
import inquirer from "inquirer";

//
export let confirmAddress = (addr) => {
  console.log("\n");
  //confirm if user wants to proceed with the entered address, or if they want to go back and change it
  inquirer
    .prompt([
      {
        type: "list",
        name: "confirmAddress",
        message: `You entered: ${addr}\n\nIs that your address?\n`,
        choices: ["Yes", "No"],
      },
    ])
    .then((answer) => {
      if (answer.confirmAddress === "Yes") {
        //validate input address
        validateAddress(addr);
      } else {
        //prompt to reenter address
        enterAddress();
      }
    });
};
