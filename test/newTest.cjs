const fetch = require("node-fetch");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

/**
 *
 * actually incorporate getting MACs into this module
 * then directly call Google API and see if it works
 *
 *
 * Successful flow:
 *   CLI:
 *      get MAC address
 *      send POST request to Heroku
 *    Heroku:
 *      receive POST request
 *      pass the payload to a POST request to Google Maps
 *          that POST request format must be valid
 *      wait for and receive answer
 *      send that answer to the CLI
 *
 *
 *
 *
 */

// const getAddress = async () => {
//   const coords = { lat: process.env.MY_LAT, lng: process.env.MY_LNG };
//   const response = await fetch(
//     `https://quickbite-server.herokuapp.com/get-address`,
//     {
//       method: "post",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(coords),
//     }
//   );
//   return Promise.resolve(response);
// };
// console.log(getAddress());

const getAddress = () => {
  const coords = { lat: process.env.MY_LAT, lng: process.env.MY_LNG };

  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/get-coords`, {
      method: "post",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      //serialize body value
      body: JSON.stringify(coords),
    })
      .catch((error) => console.log(error))

      .then((res) => res.json())

      .catch((error) => console.log(error))

      .then((json) => resolve(json));
  });
};
console.log(getAddress());
