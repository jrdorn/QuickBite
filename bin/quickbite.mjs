#!/usr/bin/env node

import chalk from "chalk";
import { cli } from "../src/index.mjs";
import { Command } from "commander/esm.mjs";

import dotenv from "dotenv"; //store API keys in the environment
const config = dotenv.config();
if (config.error) {
  throw config.error;
}
// console.log(config.parsed.MAPS_KEY);

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
//||Tests

//wifi geolocation
import fetch from "node-fetch";
import wifiscanner from "node-wifiscanner";

// TODO: RETURN STREET ADDRESS ////////////////////////////////////////////////

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

let myMACs = await getMACAddress();
let myCoords = await getCoords(myMACs);

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
let add = await getAddress(myCoords);
await console.log(add.results[0].formatted_address);

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
