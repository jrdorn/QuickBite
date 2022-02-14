import boxen from "boxen";
import chalk from "chalk";
import fetch from "node-fetch";

//fetch directions and save locally
export const fetchDirections = (origin, dest) => {
  //origin and destination geocoordinates to send to API
  const body = {
    origin: {
      lat: origin.lat,
      lng: origin.lng,
    },
    dest: {
      lat: dest.lat,
      lng: dest.lng,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/fetch-directions`, {
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
          reject(
            console.error(
              chalk.red(
                boxen(`Error: ${err}`, {
                  padding: 1,
                  borderStyle: "round",
                })
              )
            )
          );
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
      .catch((err) =>
        console.error(
          chalk.red(
            boxen(`Error: ${err}`, { padding: 1, borderStyle: "round" })
          )
        )
      );
  });
};
