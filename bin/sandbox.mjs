#!/usr/bin/env node

import inquirer from "inquirer";
import dotenv from "dotenv"; //store API keys in the environment

//google api key
const config = dotenv.config();
if (config.error) {
  throw config.error;
}

//||
let state = { level: "0", addr: "", yn: "" };

const output = ["street address", "yes/no"];

//
let q1 = (state) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "promptAddr",
        message:
          "Please enter a valid US address in the following format:\n\n(street, city, state)\n\n",
      },
    ])
    .then((answer) => {
      state.addr = answer.promptAddr;
      state.level = 1;
      return state;
    });
};

//
let q2 = (state) => {
  console.log("\n");
  //confirm if user wants to proceed with the entered address, or if they want to go back and change it
  inquirer
    .prompt([
      {
        type: "list",
        name: "repromptAddr",
        message: `You entered: ${state.addr}\n\nIs that your address?\n`,
        choices: ["Yes", "No"],
      },
    ])
    .then((answer) => {
      state.yn = answer.repromptAddr;
      return state;
    });
};

//
let q3 = (state) => {
  //validate user address
  if (state.yn === "Yes") {
    fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${state.addr}&inputtype=textquery&fields=formatted_address&key=${config.parsed.MAPS_KEY}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json, err) => {
        if (err) {
          //log any errors
          console.error(chalk.red(`Error: ${err}`));
          state.level = 0; //restart q
        } else {
          //return if address not accepted by Google Maps API, otherwise continue
          if (json.status === "OK") {
            state.addr = json.candidates[0].formatted_address;
            state.level = "2";
            //
          } else {
            console.error(chalk.red(`\nError: ${json.status}\n`));
            state.level = 0; //restart q
          }
        }
      });
  }
  return state;
};

//||
// while (state.level !== "2") {
//   (async () => {
//     if (state.level === "0") {
//       //please enter a valid us address 0, 1
//       state = await q1(state);
//     } else if (state === "1") {
//       //you entered X, is that correct? 1
//       state = await q2(state);
//       //... fetch
//       state = await q3(state);
//     }
//   })();
// }

//

let level = 0;

while (level !== "2") {
  (async () => {
    switch (level) {
      case level == "0":
        state = await q1(state);
        level = state.level;
        break;
      case (level = "1"):
        state = await q2(state);
        state = await q3(state);
        level = state.level;
    }
  })();
}
