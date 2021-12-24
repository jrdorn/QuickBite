import { chooseRestaurant } from "./chooseRestaurant.mjs";
import { key } from "../key.mjs";
import chalk from "chalk";
import boxen from "boxen";
import fetch from "node-fetch";

//search for restaurants near location
export let findRestaurants = (addr) => {
  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${addr.myCoords.lat}%2c${addr.myCoords.lng}&rankby=distance&type=restaurant&key=${key}`,
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
            boxen(`Error: ${err}`, { padding: 1, borderStyle: "round" })
          )
        );
      } else {
        //at least one restaurant is within walking distance
        if (json.status === "OK") {
          //let user choose a restaurant or quit
          chooseRestaurant(addr.myCoords, json.results);
        } else {
          //log if no results are within walking distance, or another error occurred
          console.error(
            chalk.red(
              boxen(`Error: ${json.status}`, {
                padding: 1,
                borderStyle: "round",
              })
            )
          );
          console.log("\n");
        }
      }
    });
};
