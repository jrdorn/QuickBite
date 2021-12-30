import { viewSaveSend } from "./viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import os from "os";

//save directions to file
export let saveFile = (directions, origin, sel, restaurants) => {
  console.log("\n");

  //get path to desktop (OS agnostic)
  let desktopDir = `${os.homedir()}/Desktop`;

  //ensure restaurant name doesn't violate file naming conventions
  let fileName = sel.name.replace(/[\\~#%&*{}/:<>?|\"-\s+]/g, "");

  //handle Windows format
  if (os.type() === "Windows_NT") {
    fileName = `${desktopDir}\\${fileName.toLowerCase()}.txt`;
  } else {
    fileName = `${desktopDir}/${fileName.toLowerCase()}.txt`;
  }

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
            boxen(`File already exists`, {
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
              boxen(`Success! File saved to desktop.`, {
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
    });
  }
};
