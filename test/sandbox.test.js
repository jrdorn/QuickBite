// // const sum = require("./sum");

// // //test with exact equality
// // test("adds 1+2=3", () => {
// //   expect(sum(1, 2)).toBe(3);
// // });

// // /**

// // expect() expectation object
// // toBe() matcher

// //  */

// // //check value of an object
// // test("object assignment", () => {
// //   const data = { one: 1 };
// //   data["two"] = 2;
// //   expect(data).toEqual({ one: 1, two: 2 });
// // });

// // //test for opposite of a matcher
// // test("adding positive nums is not zero", () => {
// //   for (let a = 1; a < 10; a++) {
// //     for (let b = 1; b < 10; b++) {
// //       expect(a + b).not.toBe(0);
// //     }
// //   }
// // });

// // //truthiness
// // test("null", () => {
// //   const n = null;
// //   expect(n).toBeNull();
// //   expect(n).toBeDefined();
// //   expect(n).not.toBeUndefined();
// //   expect(n).not.toBeTruthy();
// //   expect(n).toBeFalsy();
// // });
// // test("zero", () => {
// //   const z = 0;
// //   expect(z).not.toBeNull();
// //   expect(z).toBeDefined();
// //   expect(z).not.toBeUndefined();
// //   expect(z).not.toBeTruthy();
// //   expect(z).toBeFalsy;
// // });

// // //Numbers
// // test("two plus two", () => {
// //   const value = 2 + 2;
// //   expect(value).toBeGreaterThan(3);
// //   expect(value).toBeGreaterThanOrEqual(3.5);
// //   expect(value).toBeLessThan(5);
// //   expect(value).toBeLessThanOrEqual(4.5);

// //   // toBe and toEqual are the same for numbers
// //   expect(value).toBe(4);
// //   expect(value).toEqual(4);
// // });

// // // floating point equality
// // test("add floating point nums", () => {
// //   const value = 0.1 + 0.2;
// //   expect(value).toBeCloseTo(0.3);
// // });

// // //Strings
// // test("there is no I in team", () => {
// //   expect("team").not.toMatch(/I/);
// // });
// // test('but there is an "i" in "biscuit"', () => {
// //   expect("biscuit").toMatch(/i/);
// // });

// //Check arrays and interables with toContain
// const shoppingList = ["bananas", "kale", "nutella", "avocados", "oat milk"];
// test("nutella is on our shopping list", () => {
//   expect(shoppingList).toContain("nutella");
//   expect(new Set(shoppingList)).toContain("nutella");
// });

// //Exceptions
// const compileAndroidCode = () => {
//   throw new Error("wrong JDK");
// };
// test("compiling Android as expected...", () => {
//   expect(() => compileAndroidCode()).toThrow();
//   expect(() => compileAndroidCode()).toThrow(Error);

//   //specify error message or regexp
//   expect(() => compileAndroidCode()).toThrow("wrong JDK");
//   expect(() => compileAndroidCode()).toThrow(/JDK/);
// });

//Testing async code
// function fetchData(callback) {
//   const data = "nut";
//   callback(data);
// }
// test("the data is nutella", (done) => {
//   function callback(data) {
//     try {
//       expect(data).toBe("nutella");
//       done();
//     } catch (error) {
//       done(error);
//     }
//   }

//   fetchData(callback);
// });

///////////////////////////////////////////////////////////////////////////////////////

//Promises
async function fetchData() {
  return new Promise((resolve, reject) => {
    resolve("nutella");
  });
}
test("the data is nutella", () => {
  return fetchData().then((data) => {
    expect(data).toBe("nutella");
  });
});

//if you expect a promise to be rejected, use .catch and verify X number of assertions are called
async function fetchFail() {
  return new Promise((resolve, reject) => {
    reject("error");
  });
}
test("this fetch fails with an error", () => {
  expect.assertions(1);
  return fetchFail().catch((e) => expect(e).toMatch("error"));
});

// resolves/ rejects
test("resolves", () => {
  return expect(fetchData()).resolves.toBe("nutella");
});
test("rejects", () => {
  return expect(fetchFail()).rejects.toMatch("error");
});

// async/ await
test("async await", async () => {
  const data = await fetchData();
  expect(data).toBe("nutella");
});
// test("async await fail", async () => {
//   expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch("error");
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////

// test.only("this is the only test to run", () => {
//   expect(true).toBe(true);
// });

// test("this will not run", () => {
//   expect(false).toBe(true);
// });
