import { key } from "../key.mjs";
import chalk from "chalk";
import boxen from "boxen";
import fetch from "node-fetch";

//

//search for restaurants near location
export let findRestaurants = (addr) => {
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%near%${addr}&radius=1600&key=${key}`,
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
        //r
        if (json.status === "OK") {
          //
          for (let i = 0; i < json.results.length; i++) {
            console.log(json.results[i].name);
          }
          //
        } else {
          console.error(
            chalk.red(
              boxen(`Error: ${json.status}`, {
                padding: 1,
                borderStyle: "arrow",
              })
            )
          );
        }
      }
    });
};
