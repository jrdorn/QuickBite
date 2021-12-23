import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";

//let user choose to view/ save/ send walking directions for 1-5 restaurants
export let giveDirections = (restaurants) => {
  let resLength = restaurants.length;
  //display at most 5 restaurants
  if (resLength > 5) {
    resLength = 5;
  }

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
      //
      console.clear();
      //
      if (answer !== "Quit") {
        //prompt if user wants to view directions and return, save to text? file, or send via SMS/ email
        inquirer
          .prompt([
            {
              type: "list",
              name: "restOpts",
              prefix: "",
              suffix: "\n",
              message: chalk.green(
                boxen(`<Message>`, {
                  borderStyle: "round",
                  padding: 1,
                })
              ),
              choices: [
                "View",
                "Email",
                "Send via SMS",
                "Save to file",
                "Return",
              ],
            },
          ])
          .then((answer) => {
            //get directions from user address to selected address, then... (also save, so making the same call doesn't make multiple API requests)
            if (answer === "View") {
              //print walking directions, press enter to return to list
            } else if (answer === "Email") {
              //prompt for email, validate and reprompt if invalid, success screen and ask if they want to return to list or quit
            } else if (answer === "Send via SMS") {
              //message and data rates may apply
            } else if (answer === "Save to file") {
              //writable stream
            } else {
              //return to result list
            }
          });
      } else {
        //quit
      }
    });
};
