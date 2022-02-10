const testAPI = require("./testAPI");

//async test
// test("init Jest API call", () => {
//   return testAPI().then((result) => {
//     expect(result).toEqual({ one: "1", two: "2" });
//   });
// });

//dummy test
//Numbers
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are the same for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
