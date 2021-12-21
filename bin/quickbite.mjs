#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import { intro } from "../src/intro.mjs";
import { geo } from "../src/geolocation/geo.mjs";
import { enterAddress } from "../src/inquirer/enterAddress.mjs";
// import { Command } from "commander/esm.mjs";
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

//|| Main

//Abort if user is offline
dns.resolve("a16z.com", (err) => {
  if (err) {
    console.error(
      chalk.red(
        boxen(`Error: you must be online to use QuickBite`, {
          padding: 1,
          borderStyle: "arrow",
        })
      )
    );
    console.log("\n");
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
        })
        .catch((err) => {
          console.error(`Error: ${err}`);
        });

      //
      console.clear();
      console.log("\n");
      inquirer
        .prompt([
          {
            type: "list",
            name: "initAddr",
            prefix: "",
            suffix: "\n\n",
            message: chalk.green(
              boxen(`Your address is: ${myAdd}\n\n\nIs that correct?`, {
                borderStyle: "round",
                padding: 1,
              })
            ),
            choices: ["Yes", "No"],
          },
        ])
        .then((answers) => {
          //
          console.clear();
          //
          if (answers.initAddr === "Yes") {
            console.log("you said yes");
          }
          if (answers.initAddr === "No") {
            console.log("\n");
            //prompt for and validate user address
            enterAddress();
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
 * 
  flashing underscore? or ascii animations?


 seeder to populate DB with restaurants/ use Yelp or other API 
SQL query for 5 closest restaurants 
Print restaurant names to terminal, user has option to select one or esc

Google Maps walking directions listed for restaurants if close (30min walking?)
   if no restaurants in walking distance, print err 
   or if <5 are within walking distance

   list restaurants, give directions to restaurant 
 

error handling (user loses connectivity?)

make use of flags?

manual?


finish comments

write readme with screenshots

write error test cases

 */
