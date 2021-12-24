import { viewSaveSend } from "./viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";

//save directions to file
export let saveFile = (directions, restName, origin, sel) => {
  ////
  ////ensure this works for every OS - save to desktop and let user know
  /// or let user select where they want to save it

  //ensure restaurant name doesn't violate file naming conventions
  let fileName = restName.replace(/[\\~#%&*{}/:<>?|\"-\s+]/g, "");
  fileName = `${fileName.toLowerCase()}.txt`;

  //ignore and return success if the file already exists
  if (fs.existsSync(fileName)) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "saveFile",
          prefix: "",
          suffix: "\n",
          message: chalk.yellow(
            boxen(`File already exisys`, {
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
  } else {
    //try to write directions to text file
    fs.writeFile(fileName, `${directions}`, (err) => {
      if (err) {
        return console.error(
          chalk.red(
            boxen(`Error: ${err}`, {
              padding: 1,
              borderStyle: "round",
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
  }
};
