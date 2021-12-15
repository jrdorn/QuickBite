#!/usr/bin/env node

import chalk from "chalk";
import { cli } from "../src/index.mjs";
import { Command } from "commander/esm.mjs";
import dotenv from "dotenv"; //store API keys in the environment
import fetch from "node-fetch";
import listr from "listr";
import wifiscanner from "node-wifiscanner";

const config = dotenv.config();
if (config.error) {
  throw config.error;
}

const program = new Command();

program
  .description("an app for ordering pizza")
  .option("-p, --peppers", "add peppers");

program.parse();

const options = program.opts();
console.log(
  chalk.yellow(`\n
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
        reject(console.log(`Error: ${err}`));
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
          reject(console.log(`Error: ${err}`));
        } else {
          resolve(json.location);
        }
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
          reject(console.log(`Error: ${err}`));
        } else {
          resolve(json);
        }
      });
  });
};

//////////////////////////
const tasks = new listr([
  {
    title: "One",
    task: () => {
      // let myMACs = await getMACAddress();
      Promise.resolve;
    },
  },
  {
    title: "Two",
    task: () => {
      let myCoords = await getCoords(myMACs);
    },
  },
  {
    title: "Three",
    task: () => {
      let myAdd = await getAddress(myCoords);
    },
  },
  {
    title: "Four",
    task: () => {
      myAdd = myAdd.results[0].formatted_address;
    },
  },
  {
    title: "Five",
    task: () => {
      console.log(myAdd);
    },
  },
]);

tasks.run().catch((err) => {
  console.error(err);
});
// let myMACs = await getMACAddress();
// let myCoords = await getCoords(myMACs);
// let myAdd = await getAddress(myCoords);
// myAdd = myAdd.results[0].formatted_address;
// console.log(myAdd);
/////////////////////////////////////////////

//sample animation
// function twirlTimer() {
//   const P = ["\\", "|", "/", "-"];
//   let x = 0;
//   return setInterval(function () {
//     process.stdout.write("\r" + P[x++]);
//     x &= 3;
//   }, 250);
// }
//////////////////////////////////////////////////

// cli(chalk.yellow(process.argv[2]));
// if (options.peppers) console.log("peppers");

//||TODO

/**

    spinner while waiting for Promises to resolve

    ask user to manually enter their address if geoloc fails or is 
    wrong, and check for errors

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
 */
