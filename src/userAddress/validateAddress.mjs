import { enterAddress } from "./enterAddress.mjs";
import { findRestaurants } from "../restaurants/findRestaurants.mjs";

import boxen from "boxen";
import chalk from "chalk";
import fetch from "node-fetch";

//validate user address with Maps API
export const validateAddress = (addr) => {
  //validate user address
  fetch(`https://quickbite-server.herokuapp.com/validate-address`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: addr }),
  })
    .then((res) => res.json())
    .then((json, err) => {
      console.clear();
      if (err) {
        //log any errors
        console.error(
          chalk.red(
            boxen(`Error: ${err}`, { padding: 1, borderStyle: "round" })
          )
        );
        //prompt to reenter address
        enterAddress();
      } else {
        if (json.status === "OK") {
          //find restaurants near address
          let addrSuccess = {
            name: json.candidates[0].formatted_address,
            myCoords: {
              lat: json.candidates[0].geometry.location.lat,
              lng: json.candidates[0].geometry.location.lng,
            },
          };
          findRestaurants(addrSuccess);
        } else {
          //return if address not accepted by Google Maps API
          console.error(
            chalk.red(
              boxen(`Error: ${json.status}`, {
                padding: 1,
                borderStyle: "round",
              })
            )
          );
          //prompt to reenter address
          console.clear();
          enterAddress();
        }
      }
    });
};
