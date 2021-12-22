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
            //search for restaurants near address
            findRestaurants(myAdd);
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
  


# query for 5 closest restaurants 
# Print restaurant names to terminal, user has option to select one or esc
     case: <5 are within walking distance
     case: none are within walking distance

# Google Maps walking directions listed for restaurants if close (30min walking?)
   if no restaurants in walking distance, print err 
   or if <5 are within walking distance

   list restaurants, give directions to restaurant 
 
  emojis/ascii art for the type of restaurant (Chinese, Indian, Italian etc)

#
# output- offer to save directions as text file, or offline Google Maps, 

const gzip = require('zlib').createGzip();
const fs = require('fs');
const inp = fs.createReadStream('The.Matrix.1080p.mkv');
const out = fs.createWriteStream('The.Matrix.1080p.mkv.gz');
#


inp.pipe(gzip).pipe(out);

error handling (
  user loses connectivity?)

make use of flags?

manual?

integrate ora spinner
https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json

finish comments

write readme with screenshots

write error test cases






console.time('doSomething()')
doSomething()
console.timeEnd('doSomething()')

progress module for geo

 nextTick() when you want to make sure that in the next event loop iteration that code is already executed

A function passed to process.nextTick() is going to be executed on the current iteration of the event loop, after the current operation ends.
 This means it will  execute before setTimeout(() => {}, 0)


 Timers

 const id = setInterval(() => {
  // runs every 2 seconds
}, 2000)
clearInterval(id)

const interval = setInterval(() => {
  if (App.somethingIWait === 'arrived') {
    clearInterval(interval)
    return
  }
  // otherwise do things
}, 100)

ensure that in the next event loop, the code is already executed 
process.nextTick(() =>{
  //
})


Event listeners
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', (first, second) => {
  console.log(`started ${first} ${second}`)
})
eventEmitter.('start', 1, 2)

Readable and writable streams
 */
