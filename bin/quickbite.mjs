#!/usr/bin/env node

import chalk from "chalk";
import { intro } from "../src/intro.mjs";
import { geo } from "../src/geolocation/geo.mjs";
import { enterAddress } from "../src/inquirer/enterAddress.mjs";
import { Command } from "commander/esm.mjs";
import dns from "dns";
import inquirer from "inquirer";

//
// const program = new Command();
// program
//   .description("an app for ordering pizza")
//   .option("-p, --peppers", "add peppers");
// program.parse();
// const options = program.opts();
//

//////////////////////////
// let myMACs;
// let myCoords;
// let myAdd;

// const geo = new listr([
//   {
//     title: chalk.yellowBright.bold("Get MAC addresses"),
//     task: async () => {
//       myMACs = await getMACAddress();
//     },
//   },
//   {
//     title: chalk.greenBright.bold("Get geocoordinates from MACs"),
//     task: async () => {
//       myCoords = await getCoords(myMACs, config.parsed.MAPS_KEY);
//     },
//   },
//   {
//     title: chalk.blueBright.bold("Get address from geocoordinates"),
//     task: async () => {
//       myAdd = await getAddress(myCoords, config.parsed.MAPS_KEY);
//     },
//   },
//   {
//     title: chalk.magentaBright.bold(`Format address`),
//     task: () => {
//       myAdd = myAdd.results[0].formatted_address;
//     },
//   },
// ]);

//|| Main

//Abort if user is offline
dns.resolve("a16z.com", (err) => {
  if (err) {
    console.error(chalk.red(`Error: you must be online to use QuickBite\n`));
  } else {
    (async () => {
      await intro;
      let myAdd;
      await geo
        .run({
          addr: "",
        })
        .then((ctx) => {
          myAdd = ctx.addr;
          console.log(myAdd);
        })
        .catch((err) => {
          console.error(`Error: ${err}`);
        });

      //
      console.log("\n");
      inquirer
        .prompt([
          {
            type: "list",
            name: "initAddr",
            message: chalk.green(
              `Your address is: ${myAdd}\n\n\nIs that correct? (y/n)\n`
            ),
            choices: ["Yes", "No"],
          },
        ])
        .then((answers) => {
          //
          // console.clear();
          //
          if (answers.initAddr === "Yes") {
            console.log("you said yes");
          }
          if (answers.initAddr === "No") {
            console.log("\n");
            ////////////////////////////////////////////////////////////////////////////////////////
            //prompt for and validate user address
            enterAddress();
            ////////////////////////////////////////////////////////////////////////////////////////
          }
        })
        .catch((err) => {
          console.error(`Error: ${err}`);
        });
    })();
  }
});

//||TODO

/**
 * 
 
 
>Start Screen: 
press space to continue, 
clear screen after each prompt
flashing underscore? or ascii animations?



error handling (user loses connectivity?)



seeder to populate DB with restaurants/ use Yelp or other API 

SQL query for 5 closest restaurants 

Print restaurant names to terminal, user has option to select one or esc

Google Maps walking directions listed for restaurants if close (30min walking?)
   if no restaurants in walking distance, print err 
   or if <5 are within walking distance

   list restaurants, give directions to restaurant 
quickbite
   [1,2,3,4,5, esc]
quickbite 1 (2 | 3 | 4 | 5)


manual, tell users to press ctrl-c to quit? or 
detect OS/ hotkey binding and display that


polish comments

write readme with screenshots

write error test cases

 */
