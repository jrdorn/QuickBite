/**
 * Run test API calls to quickbite server
 */

const fetch = require("node-fetch");

//getCoords
const test0 = () => {
  let body = {
    one: "1",
    two: "2",
    // considerIp: "false",
    // wifiAccessPoints: "21",
  };

  return new Promise((resolve, reject) => {
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
      .then((json) => console.log(json));
  });
};

module.exports = test0;
