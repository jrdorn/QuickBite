import { confirmAddress } from "./confirmAddress.mjs";
import inquirer from "inquirer";

//
export let enterAddress = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "enterAddress",
        message:
          "Please enter a valid US address in the following format:\n\n(street, city, state)\n\n",
      },
    ])
    .then((answer) => {
      confirmAddress(answer.enterAddress);
    });
};
