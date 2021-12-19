import { confirmAddress } from "./confirmAddress.mjs";
import inquirer from "inquirer";

//prompt user to enter their address
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
