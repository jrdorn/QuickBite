import { chooseRestaurant } from "./chooseRestaurant.mjs";
import chalk from "chalk";
import boxen from "boxen";
import fetch from "node-fetch";

//search for restaurants near location
export let findRestaurants = (addr) => {
  //send lat/lng to API
  const body = {
    lat: addr.myCoords.lat,
    lng: addr.myCoords.lng,
  };

  fetch(`https://quickbite-server.herokuapp.com/find-restaurants`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json, err) => {
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
