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

const findRestaurants = () => {
  // (addr)
  // addr.myCoords.lat
  // addr.myCoords.lng
  const body = {
    lat: process.env.MY_LAT,
    lng: process.env.MY_LNG,
  };

  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/find-restaurants`, {
      // fetch(`http://localhost:5000/find-restaurants`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(addr),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => resolve(json));
  });
};
(async () => {
  console.log(await findRestaurants());
})();
