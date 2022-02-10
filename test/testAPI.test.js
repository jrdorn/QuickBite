const testAPI = require("./testAPI");

//
test("init Jest API call", () => {
  expect(testAPI()).toBe({ one: "1", two: "2" });
});
