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

//get IPv6, OS specific

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
  return wifiscanner.scan((err, data) => {
    if (err) {
      return console.log(`Error: ${err}`);
    }

    //format MAC addresses for Google Geolocation API
    let macs = data.map((a) => {
      let macsObj = {};
      //WiFi access point objects must have macAddress field
      macsObj["macAddress"] = a.mac;
      return macsObj;
    });
    // console.log(2);
    return getCoords(macs);
  });
  // console.log(3);
};

const getCoords = (macAddress) => {
  let body = {
    considerIp: "false",
    wifiAccessPoints: macAddress,
  };
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
        console.log(`Error: ${err}`);
      } else {
        console.log(json.location);
      }
    });
};

getMACAddress();

//reverse geocoding - lookup address given lat/lng

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
