import chalk from "chalk";
// import keypress from "keypress";
// import inquirer from "inquirer";
import process from "process";

//
let introImg = chalk.green(`\n

                  -------------------------------------------------------------                 
                |  _____           _           _      _____    _    _           |               
                | |     |   _ _   |_|   ___   | |_   | __  |  |_|  | |_    ___  |               
                | |  |  |  | | |  | |  |  _|  | '_|  | __ -|  | |  |  _|  | -_| |               
                | |__  _|  |___|  |_|  |___|  |_,_|  |_____|  |_|  |_|    |___| |               
                |    |__|                                                       |               
                  -------------------------------------------------------------                 


                                  Press [ space ] to continue

                               Press [ ctrl + c ] to quit anytime

\n`);

//||keypress module
// keypress(process.stdin);
// process.stdin.on("keypress", (ch, key) => {
//   if (key.name === "space") {
//     console.log(key.name);
//   }
// });

// export let intro = (async () => {
//   console.log(introImg);
//   await keypress();
//   //   console.log("goodbye");
// })();

//||custom keypress
//
// const keypress = async () => {
//   process.stdin.setRawMode(true);
//   return new Promise((resolve) =>
//     process.stdin.on("data", (data) => {
//       const byteArray = [...data];
//       //start program once space pressed
//       if (byteArray.length > 0 && byteArray[0] === 32) {
//         // process.exit(1); //quit
//       }
//       process.stdin.setRawMode(false);
//       resolve();
//     })
//   );
// };

// export let intro = (async () => {
//   console.log(introImg);
//   await keypress();
//   //   console.log("goodbye");
// })();

//||keypress module

//|| readline
// import readline from "readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let startPromise = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("\nradarada\n", (answer) => {
//       if (answer === " ") {
//         console.log("yes");
//         rl.close();
//         resolve();
//       } else {
//         reject(console.log("no"));
//       }
//     });
//   });
// };

// export let intro = (async () => {
//   let answer = await startPromise();
//   return 1;
// })();
