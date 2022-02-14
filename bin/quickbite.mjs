#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import { intro } from "../src/intro.mjs";
import { geo } from "../src/geolocation/geo.mjs";
import { enterAddress } from "../src/userAddress/enterAddress.mjs";
import { findRestaurants } from "../src/restaurants/findRestaurants.mjs";
import dns from "dns";
import inquirer from "inquirer";

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
      let myAdd = {};
      await geo
        .run({
          addr: "",
        })
        .then((ctx) => {
          myAdd.addr = ctx.addr;
          myAdd.myCoords = ctx.myCoords;
        })
        .catch((err) => {
          console.error(`Error: ${err}`);
        });

      //
      console.clear();
      //
      console.log("\n");
      inquirer
        .prompt([
          {
            type: "list",
            name: "initAddr",
            prefix: "",
            suffix: "\n\n",
            message: chalk.green(
              boxen(`Your address is: ${myAdd.addr}\n\n\nIs that correct?`, {
                borderStyle: "round",
                padding: 1,
              })
            ),
            choices: ["Yes", "No"],
          },
        ])
        .then((answers) => {
          console.clear();
          if (answers.initAddr === "Yes") {
            //search for restaurants near address
            findRestaurants(myAdd);
          }
          if (answers.initAddr === "No") {
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
