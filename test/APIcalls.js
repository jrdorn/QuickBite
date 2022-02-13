/**
 * Run test API calls to quickbite server
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
//

const fetch = require("node-fetch");

const wifiscanner = require("node-wifiscanner");

//
//
//
const getMACAddress = () => {
  return new Promise((resolve, reject) => {
    wifiscanner.scan((err, data) => {
      if (err) {
        reject(err);
      } else {
        //format MAC addresses for Google Geolocation API
        let macs = data.map((a) => {
          let macsObj = {};
          //WiFi access point objects must have macAddress field
          macsObj["macAddress"] = a.mac;
          return macsObj;
        });
        //
        resolve(macs);
      }
    });
  });
};
//
//
//

//|| getCoords
const getCoords = (macs) => {
  let body = {
    considerIp: "false",
    wifiAccessPoints: macs,
  };

  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/get-coords`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      //serialize body value
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => resolve(json));
  });
};

//
//
const testBack = () => {
  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/testback`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //serialize body value
      body: JSON.stringify(process.env.MY_COORDS),
    })
      .then((res) => res.json())
      .then((json) => resolve(json));
  });
};
//
//

//
//
//
//|| getAddress
const getAddress = () => {
  const coords = { lat: process.env.MY_LAT, lng: process.env.MY_LNG };

  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/get-address`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //serialize body value
      body: JSON.stringify(coords),
    })
      .then((res) => res.json())
      .then((json) => resolve(json));
  });
};

//
//
//
//
//
//
//

//|| validateAddress
const validateAddress = () => {
  return new Promise((resolve, reject) => {
    const body = { address: "20 W 34th St, New York, NY 10001" };
    fetch(`https://quickbite-server.herokuapp.com/validate-address`, {
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
//
//
//
//

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

exports.getMACAddress = getMACAddress;

exports.getCoords = getCoords;

exports.testBack = testBack;

exports.getAddress = getAddress;

exports.validateAddress = validateAddress;
exports.findRestaurants = findRestaurants;
exports.sendMail = sendMail;
exports.fetchDirections = fetchDirections;
