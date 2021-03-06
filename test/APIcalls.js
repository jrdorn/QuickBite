/**
 * Run test API calls to quickbite server
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
//

const fetch = require("node-fetch");
const wifiscanner = require("node-wifiscanner");

//|| getMACAddress
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

//|| findRestaurants
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

//|| sendMail
const sendMail = () => {
  // (directions, recipient)
  let body = {
    directions: process.env.MAIL_DIRS,
    recipient: process.env.MAIL_REC,
  };

  return new Promise((resolve, reject) => {
    fetch(`https://quickbite-server.herokuapp.com/send-mail`, {
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
  // (origin, dest)
  //
  const body = {
    origin: {
      lat: process.env.MY_LAT,
      lng: process.env.MY_LNG,
    },
    dest: {
      lat: process.env.D_LAT,
      lng: process.env.D_LNG,
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
      .then((json) => resolve(json));
  });
};

//exports to test
exports.getMACAddress = getMACAddress;
exports.getCoords = getCoords;
exports.getAddress = getAddress;
exports.validateAddress = validateAddress;
exports.findRestaurants = findRestaurants;
exports.sendMail = sendMail;
exports.fetchDirections = fetchDirections;
