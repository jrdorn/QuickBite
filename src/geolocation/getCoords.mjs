import { key } from "../key.mjs";
import fetch from "node-fetch";

//find lat/lng of user
export const getCoords = (macAddress) => {
  let body = {
    considerIp: "false",
    wifiAccessPoints: macAddress,
  };

  return new Promise((resolve, reject) => {
    //send POST request to API
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`, {
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
        return Promise.reject(err);
      });
  });
};
