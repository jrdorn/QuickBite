import { viewSaveSend } from "./viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

export let viewDirs = (directions, origin, sel) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "restOpts",
        prefix: "",
        suffix: "\n",
        message: chalk.green(
          boxen(`DIRECTIONS`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
        choices: ["Return", "stay"],
      },
    ])
    .then(() => {
      viewSaveSend(origin, sel);
    });
};
