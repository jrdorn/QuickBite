import { fetchDirections } from "./fetchDirections.mjs";
import { viewDirs } from "./viewDirs.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//view, save, or send directions
export let viewSaveSend = (originCoords, selectedRestaurant) => {
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
      if (answer.restOpts !== "Return") {
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
            // viewDirs(directions, originCoords, selectedRestaurant);
            console.clear();
            viewDirs(directions, originCoords, selectedRestaurant);
            //
          } else if (answer.restOpts === "Email directions") {
            //prompt for email, validate and reprompt if invalid, success screen and ask if they want to return to list or quit
          } else if (answer.restOpts === "Send via SMS") {
            //message and data rates may apply
          } else if (answer.restOpts === "Save to file") {
            //writable stream
          }
        })();
      }
      //return to result list
      //
    });
};
