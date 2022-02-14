import boxen from "boxen";
import chalk from "chalk";
import fetch from "node-fetch";

//reverse geocoding - lookup address given lat/lng
export const getAddress = (coords) => {
  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/get-address`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coords),
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
          resolve(json);
        }
      })
      .catch((err) => console.error(`Error: ${err.message}\n`));
  });
};
