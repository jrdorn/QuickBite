/**
 * Run test API calls to quickbite server
 */

const fetch = require("node-fetch");

//|| getCoords
/**
 * get local wifiAccessPoints
 * then store in env variable for test
 */
const getCoords = () => {
  let body = {
    considerIp: "false",
    wifiAccessPoints: "21",
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
      .then((json) => resolve(json));
  });
};

//|| validateAddress
const validateAddress = () => {
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
      .then((json) => resolve(json));
  });
};

//|| findRestaurants
const findRestaurants = () => {
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
      .then((json) => resolve(json));
  });
};

//|| sendMail
const sendMail = () => {
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
      .then((json) => resolve(json));
  });
};

//|| fetchDirections
const fetchDirections = () => {
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
      .then((json) => resolve(json));
  });
};

//exports to test
exports.getCoords = getCoords;
exports.validateAddress = validateAddress;
exports.findRestaurants = findRestaurants;
exports.sendMail = sendMail;
exports.fetchDirections = fetchDirections;
