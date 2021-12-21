#!/usr/bin/env node

import chalk from "chalk";
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
            message: chalk.green(
              `Your address is: ${myAdd}\n\n\nIs that correct? (y/n)\n`
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
  
after start, ignore keypress unless inquirer is prompting user 

 seeder to populate DB with restaurants/ use Yelp or other API 
SQL query for 5 closest restaurants 
Print restaurant names to terminal, user has option to select one or esc

Google Maps walking directions listed for restaurants if close (30min walking?)
   if no restaurants in walking distance, print err 
   or if <5 are within walking distance

   list restaurants, give directions to restaurant 
 
 
>Start Screen: 
clear screen after each prompt
flashing underscore? or ascii animations?



error handling (user loses connectivity?)

make use of flags?

manual?


polish comments

write readme with screenshots

write error test cases

 */
