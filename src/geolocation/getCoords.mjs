import boxen from "boxen";
import chalk from "chalk";
import fetch from "node-fetch";

//find lat/lng of user
export const getCoords = (macAddress) => {
  const body = {
    considerIp: "false",
    wifiAccessPoints: macAddress,
  };

  return new Promise((resolve, reject) => {
    //send POST request to API
    fetch(`https://quickbite-server.herokuapp.com/get-coords`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //serialize body value
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json, err) => {
        if (err) {
          reject(console.error(`Error: ${err}`));
        } else {
          //return geocoordinates
          resolve(json.location);
        }
      })
      .catch((err) => {
        return Promise.reject(
          console.error(
            chalk.red(
              boxen(`Error: ${err}`, { padding: 1, borderStyle: "round" })
            )
          )
        );
      });
  });
};
