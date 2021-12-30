import { viewSaveSend } from "./viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//print restaurant directions to console
export let viewDirs = (directions, origin, sel, restaurants) => {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: "list",
        name: "restOpts",
        prefix: "",
        suffix: "\n",
        message: chalk.green(
          boxen(`${directions}`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
        choices: ["Return"],
      },
    ])
    .then(() => {
      console.clear();
      viewSaveSend(origin, sel, restaurants);
    });
};
