import { key } from "../key.mjs";
import fetch from "node-fetch";

/**
 * 
 *
 (check local storage before calling fetchDirections)
 *
 */

//fetch directions and save locally
export const fetchDirections = (origin, dest) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${dest.lat},${dest.lng}&mode=walking&key=${key}`,
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
        if (err) {
          console.error(`Error: ${err}`);
        } else {
          let stepJSON = json.routes[0].legs[0].steps;

          //list of steps to return to user
          let stepString = `\nDirections to ${dest.name}\n\n`;

          for (let i = 0; i < stepJSON.length; i++) {
            //get one line of directions
            let oneStep = stepJSON[i].html_instructions;

            //regex to remove html tags
            oneStep = oneStep.replace(/<\/?[^>]+(>|$)/g, "");

            //split final line
            if (i === stepJSON.length - 1) {
              oneStep = oneStep.replace(/Destination/, "\n\nDestination");
            }

            //add this step to main string
            stepString += `${i + 1}. ${oneStep}\n\n`;
          }
          resolve(stepString);
        }
      })
      .catch((err) => console.error(`Error: ${err.message}\n`));
  });
};
