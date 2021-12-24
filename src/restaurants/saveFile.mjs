import { viewSaveSend } from "./viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";

//save directions to file
export let saveFile = (restName, origin, sel) => {
  ////
  ////ensure this works for every OS - save to desktop and let user know
  /// or let user select where they want to save it

  ////create file if it does not exist

  ////ignore if it already does exist

  //ensure restaurant name doesn't violate file naming conventions
  let fileName = restName.replace(/[\\~#%&*{}/:<>?|\"-\s+]/g, "");

  //
  fs.writeFile(`${fileName.toLowerCase()}.txt`, `${directions}`, (err) => {
    if (err) {
      return console.error(
        chalk.red(
          boxen(`Error: ${err}`, {
            padding: 1,
            borderStyle: "arrow",
          })
        )
      );
    }
    //Success
    inquirer
      .prompt([
        {
          type: "list",
          name: "saveFile",
          prefix: "",
          suffix: "\n",
          message: chalk.green(
            boxen(`Success!`, {
              borderStyle: "round",
              padding: 1,
            })
          ),
          choices: ["Return"],
        },
      ])
      .then(() => {
        viewSaveSend(origin, sel);
      });
  });
};
