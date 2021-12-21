import { enterAddress } from "./enterAddress.mjs";
import { key } from "../key.mjs";
import chalk from "chalk";
import fetch from "node-fetch";

//
export let validateAddress = (addr) => {
  //validate user address
  fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${addr}&inputtype=textquery&fields=formatted_address&key=${key}`,
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
        //log any errors
        console.error(chalk.red(`Error: ${err}`));
        //prompt to reenter address
        enterAddress();
      } else {
        //return if address not accepted by Google Maps API, otherwise continue
        if (json.status === "OK") {
          //
          let addrSuccess = json.candidates[0].formatted_address;
          console.log(addrSuccess);
          //
        } else {
          console.error(chalk.red(`\nError: ${json.status}\n`));
          //prompt to reenter address
          enterAddress();
        }
      }
    });
};