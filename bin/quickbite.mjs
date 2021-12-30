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

//||TODO

/**
 *   

check everything and finish comments

formatting 
  \n
  console.clear
  chalk + boxen error messages

write readme with screenshots

draw map of flow




# Upcoming Features #
-email: directions to ${restaurant name}
-save origin/ destination to directionStorage (or async hooks?) check before calling fetch 
-keep track of email address- prompt if user wants to use previously entered or new address
-refactor promptMail validation
-support for SMS
-ora spinner for sendMail async 
-option to change address in chooseRestaurant, instead of having to restart
-make use of flags, man page
-progress bars for geo module


# Tests #
-what if <5 are within walking distance? verify this works
-email being rejected as spam
-error handling if user loses connectivity during session



  // const spinner = ora({ spinner: "flip" }).start();
  // const spinThis = setInterval(() => {
  //   spinner.color = "green";
  // }, 1000);

  // clearInterval(spinThis);

  // const interval = setInterval(() => {
  //   if (App.somethingIWait === "arrived") {
  //     clearInterval(interval);
  //     return;
  //   }
  //   // otherwise do things
  // }, 100);

 */
