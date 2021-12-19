#!/usr/bin/env node

import chalk from "chalk";
//
import { cli } from "../src/index.mjs";
import { enterAddress } from "../src/enterAddress.mjs";
import { confirmAddress } from "../src/confirmAddress.mjs";
import { validateAddress } from "../src/validateAddress.mjs";
//
import { Command } from "commander/esm.mjs";
//
import dns from "dns";
import dotenv from "dotenv"; //store API keys in the environment
import fetch from "node-fetch";
import inquirer from "inquirer";
import listr from "listr";
import wifiscanner from "node-wifiscanner";

//
const config = dotenv.config();
if (config.error) {
  throw config.error;
}

//
const program = new Command();

program
  .description("an app for ordering pizza")
  .option("-p, --peppers", "add peppers");

program.parse();

//
const options = program.opts();
console.log(
  chalk.green(`\n
           --------------------------------------------------------------                 
          |  _____           _           _      _____    _    _           |               
          | |     |   _ _   |_|   ___   | |_   | __  |  |_|  | |_    ___  |               
          | |  |  |  | | |  | |  |  _|  | '_|  | __ -|  | |  |  _|  | -_| |               
          | |__  _|  |___|  |_|  |___|  |_,_|  |_____|  |_|  |_|    |___| |               
          |    |__|                                                       |               
           --------------------------------------------------------------                 


\n`)
);

//////////////////////////////////////////////////

//||WiFi geolocation

//find MAC addresses of nearby WiFi access points
const getMACAddress = () => {
  return new Promise((resolve, reject) => {
    wifiscanner.scan((err, data) => {
      if (err) {
        reject(console.error(`Error: ${err}`));
      } else {
        //format MAC addresses for Google Geolocation API
        let macs = data.map((a) => {
          let macsObj = {};
          //WiFi access point objects must have macAddress field
          macsObj["macAddress"] = a.mac;
          return macsObj;
        });
        //
        resolve(macs);
      }
    });
  });
};

//find lat/lng of user
const getCoords = (macAddress) => {
  let body = {
    considerIp: "false",
    wifiAccessPoints: macAddress,
  };

  return new Promise((resolve, reject) => {
    //send POST request to API
    fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${config.parsed.MAPS_KEY}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //serialize body value
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((json, err) => {
        if (err) {
          reject(console.error(`Error: ${err}`));
        } else {
          resolve(json.location);
        }
      })
      // .catch((err) => console.log(chalk.red(`Error: ${err.message}\n`)));
      .catch((err) => {
        return Promise.reject(err);
      });
  });
};

//reverse geocoding - lookup address given lat/lng
const getAddress = (coords) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${config.parsed.MAPS_KEY}`,
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
          console.error(`Error: ${err}`);
        } else {
          resolve(json);
        }
      })
      .catch((err) => console.error(`Error: ${err.message}\n`));
  });
};

//////////////////////////
let myMACs;
let myCoords;
let myAdd;

const tasks = new listr([
  {
    title: chalk.yellowBright.bold("Get MAC addresses"),
    task: async () => {
      myMACs = await getMACAddress();
    },
  },
  {
    title: chalk.greenBright.bold("Get geocoordinates from MACs"),
    task: async () => {
      myCoords = await getCoords(myMACs);
    },
  },
  {
    title: chalk.blueBright.bold("Get address from geocoordinates"),
    task: async () => {
      myAdd = await getAddress(myCoords);
    },
  },
  {
    title: chalk.magentaBright.bold(`Format address`),
    task: () => {
      myAdd = myAdd.results[0].formatted_address;
    },
  },
]);

//|| Main

//Abort if user is offline
dns.resolve("a16z.com", (err) => {
  if (err) {
    console.error(chalk.red(`Error: you must be online to use QuickBite\n`));
  } else {
    (async () => {
      //
      await tasks.run().catch((err) => {
        console.error(`Error: ${err}`);
      });
      //

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
            enterAddress();

            // inquirer
            //   .prompt([
            //     {
            //       type: "input",
            //       name: "promptAddr",
            //       message:
            //         "Please enter a valid US address in the following format:\n\n(street, city, state)\n\n",
            //     },
            //   ])
            //   .then((answer) => {
            //     console.log("\n");
            //     //confirm if user wants to proceed with the entered address, or if they want to go back and change it
            //     inquirer
            //       .prompt([
            //         {
            //           type: "list",
            //           name: "repromptAddr",
            //           message: `You entered: ${answer.promptAddr}\n\nIs that your address?\n`,
            //           choices: ["Yes", "No"],
            //         },
            //       ])
            //       .then((rpAnswer) => {
            //         //validate user address
            //         if (rpAnswer.repromptAddr === "Yes") {
            //           fetch(
            //             `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${answer.promptAddr}&inputtype=textquery&fields=formatted_address&key=${config.parsed.MAPS_KEY}`,
            //             {
            //               method: "post",
            //               headers: {
            //                 Accept: "application/json",
            //                 "Content-Type": "application/json",
            //               },
            //             }
            //           )
            //             .then((res) => res.json())
            //             .then((json, err) => {
            //               if (err) {
            //                 //log any errors
            //                 // reject(console.error(`Error: ${err}`));
            //                 console.error(chalk.red(`Error: ${err}`));
            //               } else {
            //                 //return if address not accepted by Google Maps API, otherwise continue
            //                 // resolve(console.log(json));
            //                 if (json.status === "OK") {
            //                   console.log(json.candidates[0].formatted_address);
            //                   // i = true;
            //                   //
            //                   //
            //                 } else {
            //                   console.error(
            //                     chalk.red(`\nError: ${json.status}\n`)
            //                   );
            //                 }
            //               }
            //             })
            //             .catch((err) =>
            //               console.log(chalk.red(`Error: ${err.message}\n`))
            //             );
            //         }
            //       });
            //   });
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

>ask user to manually enter their address if geoloc fails or is wrong


Start Screen: display ascii, press space to continue, press (...) any time to quit, and clear screen after each prompt

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

write error test cases

 */
