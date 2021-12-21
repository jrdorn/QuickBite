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

// keypress(process.stdin);
// process.stdin.on("keypress", (ch, key) => {
//   if (key.name === "space") {
//     console.log(key.name);
//   }
// });

//press space, then start program
// export let intro = async () => {
//   console.log(introImg);
// };

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", (data) => {
      const byteArray = [...data];
      if (byteArray.length > 0 && byteArray[0] === 3) {
        console.log("yup");
        process.exit(1);
      }
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

export let intro = (async () => {
  console.log(introImg);
  await keypress();
  console.log("goodbye");
})().then(process.exit);
