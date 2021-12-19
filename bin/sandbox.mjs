#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import dotenv from "dotenv"; //store API keys in the environment
import fetch from "node-fetch";

//google api key
const config = dotenv.config();
if (config.error) {
  throw config.error;
}

//||
let enterAddress = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "enterAddress",
        message:
          "Please enter a valid US address in the following format:\n\n(street, city, state)\n\n",
      },
    ])
    .then((answer) => {
      confirmAddress(answer.enterAddress);
    });
};

//||
let confirmAddress = (addr) => {
  console.log("\n");
  //confirm if user wants to proceed with the entered address, or if they want to go back and change it
  inquirer
    .prompt([
      {
        type: "list",
        name: "confirmAddress",
        message: `You entered: ${addr}\n\nIs that your address?\n`,
        choices: ["Yes", "No"],
      },
    ])
    .then((answer) => {
      if (answer.confirmAddress === "Yes") {
        //validate input address
        validateAddress(addr);
      } else {
        //prompt to reenter address
        enterAddress();
      }
    });
};

//||
let validateAddress = (addr) => {
  //validate user address
  fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${addr}&inputtype=textquery&fields=formatted_address&key=${config.parsed.MAPS_KEY}`,
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
        //prompt to reenter address
        enterAddress();
      } else {
        //return if address not accepted by Google Maps API, otherwise continue
        if (json.status === "OK") {
          //
          let addrSuccess = json.candidates[0].formatted_address;
          console.log(json);
          //
        } else {
          console.error(chalk.red(`\nError: ${json.status}\n`));
          //prompt to reenter address
          enterAddress();
        }
      }
    });
};

//||
enterAddress();

//
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
// while (level !== "2") {
//   (async () => {
//     switch (level) {
//       case level == "0":
//         state = await q1(state);
//         level = state.level;
//         break;
//       case (level = "1"):
//         state = await q2(state);
//         state = await q3(state);
//         level = state.level;
//     }
//   })();
// }
//////////
// let loopAddress = async () => {
//   // console.log("a");
//   const promises = await (async () => {
//     // console.log("b");
//     switch (level) {
//       case level === "0":
//         // console.log("c");
//         state = await q1(state);
//         level = state.level;
//         break;
//       case level == "1":
//         // console.log("d");
//         state = await q2(state);
//         state = await q3(state);
//         level = state.level;
//     }
//   })();
//   // console.log("e");
//   const data = promises;
//   return data;
// };
// loopAddress();
