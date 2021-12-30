import { viewSaveSend } from "./viewSaveSend.mjs";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//let user choose to view/ save/ send walking directions for 1-5 restaurants
export let chooseRestaurant = (originCoords, restaurants) => {
  console.log("\n");
  let resLength = restaurants.length;
  //display at most 5 restaurants
  if (resLength > 5) {
    resLength = 5;
  }

  //put restaurant names into list of options for user to choose from,
  //get name/ address/ coordinates for use with Google Directions API
  let myRest = {};
  myRest.choices = [];
  for (let i = 0; i < resLength; i++) {
    myRest[i] = {};
    myRest.choices.push(restaurants[i].name);
    myRest[i].name = restaurants[i].name;
    myRest[i].lat = restaurants[i].geometry.location.lat;
    myRest[i].lng = restaurants[i].geometry.location.lng;
    myRest[i].addr = restaurants[i].vicinity;
  }
  myRest.choices.push("Quit");

  //ask user to choose a restaurant or quit program
  inquirer
    .prompt([
      {
        type: "list",
        name: "restDirs",
        prefix: "",
        suffix: "\n",
        message: chalk.green(
          boxen(`Choose a restaurant`, {
            borderStyle: "round",
            padding: 1,
          })
        ),
        choices: myRest.choices,
      },
    ])
    .then((answer) => {
      console.clear();

      if (answer.restDirs !== "Quit") {
        //name of restaurant -> index in list -> same index for object in container object
        let indexOfRest = myRest.choices.indexOf(answer.restDirs);
        let selectedRest = myRest[indexOfRest];

        //let user view, save, or send directions
        console.clear();
        viewSaveSend(originCoords, selectedRest, restaurants);
      } else {
        //exit QuickBite
        process.exit(0);
      }
    });
};
