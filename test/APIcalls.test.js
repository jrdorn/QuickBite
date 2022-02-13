const {
  getMACAddress,

  getCoords,

  testBack,

  getAddress,
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
// verify any response send to the Heroku server
// test.only("testBack", () => {
//   return expect(testBack()).resolves.toEqual({
//     lat: 1,
//     lng: "2",
//   });
// });
//
//
//

// send LatLng object to API and receive street address
test.only("getAddress", () => {
  return expect(
    getAddress().then((ans) => {
      return ans;
    })
  ).resolves.toEqual({
    one: "1",
    two: "2",
  });
});

//
// test.only("validateAddress", () => {
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
