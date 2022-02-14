const {
  getMACAddress,
  getCoords,
  getAddress,
  validateAddress,
  findRestaurants,
  sendMail,
  fetchDirections,
} = require("./APIcalls.js");

/**
 ERRS

|| validate address after entering new one
FetchError: invalid json response body at https://quickbite-server.herokuapp.com/validate-address reason: Unexpected token < in JSON at position 0


 */

//PASS: validate that Heroku server receives validated JSON object, sends a POST request to Maps, and returns an object containing location and accuracy keys
test("getCoords", () => {
  const expectedObj = {
    location: "bar",
    accuracy: "foo",
  };

  return expect(
    getMACAddress()
      .then((mac) => getCoords(mac))
      .then((serverRes) => Object.keys(serverRes))
  ).resolves.toEqual(Object.keys(expectedObj));
});

// PASS: send LatLng object to API and receive street address
test("getAddress", () => {
  const expectedObj = {
    plus_code: "foo",
    results: "bar",
    status: "foobar",
  };

  return expect(
    getAddress().then((serverRes) => Object.keys(serverRes))
  ).resolves.toEqual(Object.keys(expectedObj));
});

// PASS: validate user address with Maps API
test("validateAddress", () => {
  const expectedObj = {
    candidates: "foo",
    status: "bar",
  };

  return expect(
    validateAddress().then((serverRes) => Object.keys(serverRes))
  ).resolves.toEqual(Object.keys(expectedObj));
});

// PASS: send lat/lng to server, receive restaurant list
test("findRestaurants", () => {
  const expectedObj = {
    html_attributions: "foo",
    next_page_token: "bar",
    results: "foo",
    status: "bar",
  };

  return expect(
    findRestaurants().then((serverRes) => Object.keys(serverRes))
  ).resolves.toEqual(Object.keys(expectedObj));
});

// PASS: send lat/lng for origin and destination to server, receive directions
test("fetchDirections", () => {
  const expectedObj = {
    geocoded_waypoints: "foo",
    routes: "bar",
    status: "foobar",
  };

  return expect(
    fetchDirections().then((serverRes) => Object.keys(serverRes))
  ).resolves.toEqual(Object.keys(expectedObj));
});

// PASS: send email and directions to server, receive 'true' when server successfully sends email
test("sendMail", () => {
  return expect(sendMail()).resolves.toBe(true);
});

/**
 * move keynote file, map to Trello
 * build and publish to NPM
 * write README
 * update Google docs
 */
