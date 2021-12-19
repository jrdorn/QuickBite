//reverse geocoding - lookup address given lat/lng
const getAddress = (coords) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${config.parsed.MAPS_KEY}`,
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
