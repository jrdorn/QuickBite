// require("dotenv").config();

const {
  getMACAddress,

  getCoords,

  testBack,

  validateAddress,
  findRestaurants,
  sendMail,
  fetchDirections,
} = require("./APIcalls.js");

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

//
//
// test.only("testBack", () => {
// return expect(testBack()).resolves.toEqual({
//   considerIp: "false",
//   wifiAccessPoints: process.env.MY_MACS,
// });
// });
//
//
//

// //
// test("validateAddress", () => {
//   return expect(validateAddress()).resolves.toEqual({ one: "1", two: "2" });
// });

// //
// test("findRestaurants", () => {
//   return expect(findRestaurants()).resolves.toEqual({ one: "1", two: "2" });
// });

// //
// test("sendMail", () => {
//   return expect(sendMail()).resolves.toEqual({ one: "1", two: "2" });
// });

// //
// test("fetchDirections", () => {
//   return expect(fetchDirections()).resolves.toEqual({ one: "1", two: "2" });
// });
