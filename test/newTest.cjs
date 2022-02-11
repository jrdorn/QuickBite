const fetch = require("node-fetch");

require("dotenv").config();

/**
 *
 * actually incorporate getting MACs into this module
 * then directly call Google API and see if it works
 *
 *
 * Successful flow:
 *   CLI:
 *      get MAC address
 *      send POST request to Heroku
 *    Heroku:
 *      receive POST request
 *      pass the payload to a POST request to Google Maps
 *          that POST request format must be valid
 *      wait for and receive answer
 *      send that answer to the CLI
 *
 *
 *
 *
 */

const wifiscanner = require("node-wifiscanner");

//find MAC addresses of nearby WiFi access points
const getMACAddress = () => {
  return new Promise((resolve, reject) => {
    wifiscanner.scan((err, data) => {
      if (err) {
        reject(err);
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

const getCoords = (macs) => {
  return new Promise((resolve, reject) => {
    let body = {
      considerIp: "false",
      wifiAccessPoints: macs,
    };

    console.log(macs);

    fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.MAPS_KEY}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //
        body: JSON.stringify(body),
      }
    )
      //
      .then((res) => res.json())
      .then((json, err) => {
        if (err) {
          reject(console.log(err));
        } else {
          // resolve(console.log(json.error.errors, json.error.details));
          // resolve(console.log(json.error.details[0]));
          resolve(console.log(json));
        }
      });
  });
};

getMACAddress().then((macs) => getCoords(macs));
