import { chooseRestaurant } from "./chooseRestaurant.mjs";
// import { directionStorage } from "./directionStorage.mjs";
import { fetchDirections } from "./fetchDirections.mjs";
import { saveFile } from "./saveFile.mjs";
import { viewDirs } from "./viewDirs.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//view, save, or send directions
export let viewSaveSend = (originCoords, selectedRestaurant, restaurants) => {
  //prompt if user wants to view directions and return, save to text? file, or send via SMS/ email
  inquirer
    .prompt([
      {
        type: "list",
        name: "restOpts",
        prefix: "",
        suffix: "\n",
        message: chalk.green(
          boxen(`What do you want to do next?`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
        choices: [
          "View directions",
          "Email directions",
          "Send via SMS",
          "Save to file",
          "Return to menu",
        ],
      },
    ])
    .then((answer) => {
      (async () => {
        //get directions
        let directions = await fetchDirections(
          originCoords,
          selectedRestaurant
        );

        //
        //   (also save dirs locally for session, so making the same call doesn't make multiple API requests)
        //

        if (answer.restOpts === "View directions") {
          //print walking directions, press enter to return to list
          viewDirs(directions, originCoords, selectedRestaurant, restaurants);
        } else if (answer.restOpts === "Email directions") {
          //prompt for email, validate and reprompt if invalid, success screen and ask if they want to return to list or quit
          //TODO
        } else if (answer.restOpts === "Send via SMS") {
          //message and data rates may apply
          //TODO
        } else if (answer.restOpts === "Save to file") {
          //write directions to text file
          saveFile(directions, originCoords, selectedRestaurant, restaurants);
        } else if (answer.restOpts === "Return to menu") {
          //return to result list
          chooseRestaurant(originCoords, restaurants);
        }
      })();
    });
};
