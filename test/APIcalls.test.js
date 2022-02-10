const {
  getCoords,
  validateAddress,
  findRestaurants,
  sendMail,
  fetchDirections,
} = require("./APIcalls.js");

//
test.only("getCoords", () => {
  return expect(getCoords()).resolves.toEqual({ one: "1", two: "2" });
});

//
test("validateAddress", () => {
  return expect(validateAddress()).resolves.toEqual({ one: "1", two: "2" });
});

//
test("findRestaurants", () => {
  return expect(findRestaurants()).resolves.toEqual({ one: "1", two: "2" });
});

//
test("sendMail", () => {
  return expect(sendMail()).resolves.toEqual({ one: "1", two: "2" });
});

//
test("fetchDirections", () => {
  return expect(fetchDirections()).resolves.toEqual({ one: "1", two: "2" });
});
