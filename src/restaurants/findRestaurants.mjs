import { giveDirections } from "./giveDirections.mjs";
import { key } from "../key.mjs";
import chalk from "chalk";
import boxen from "boxen";
import fetch from "node-fetch";

let lat;
let lng;

//search for restaurants near location
export let findRestaurants = (addr) => {
  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2c${lng}&rankby=distance&type=restaurant&key=${key}`,
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((json, err) => {
      //
      //   console.clear();
      //
      if (err) {
        //log any errors
        console.error(
          chalk.red(
            boxen(`Error: ${err}`, { padding: 1, borderStyle: "arrow" })
          )
        );
      } else {
        //at least one restaurant is within walking distance
        if (json.status === "OK") {
          //let user choose a restaurant or quit
          giveDirections(json.results);
        } else {
          //log if no results are within walking distance, or another error occurred
          console.error(
            chalk.red(
              boxen(`Error: ${json.status}`, {
                padding: 1,
                borderStyle: "arrow",
              })
            )
          );
          console.log("\n");
        }
      }
    });
};
