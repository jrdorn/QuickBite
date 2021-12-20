import fetch from "node-fetch";

//reverse geocoding - lookup address given lat/lng
export const getAddress = (coords, MAPS_KEY) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${MAPS_KEY}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json, err) => {
        if (err) {
          console.error(`Error: ${err}`);
        } else {
          resolve(json);
        }
      })
      .catch((err) => console.error(`Error: ${err.message}\n`));
  });
};
