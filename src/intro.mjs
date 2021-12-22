import chalk from "chalk";
// import ora from "ora";
import process from "process";
import readline from "readline";

//
// const spinner = ora({ spinner: "flip" }).start();
// const spinThis = setTimeout(() => {
//   spinner.color = "green";
// }, 1000);
//

//
let introImg = chalk.green(`\n



      + ============================================================= +         
      |  _____           _           _      _____    _    _           |        
      | |     |   _ _   |_|   ___   | |_   | __  |  |_|  | |_    ___  |        
      | |  |  |  | | |  | |  |  _|  | '_|  | __ -|  | |  |  _|  | -_| |        
      | |__  _|  |___|  |_|  |___|  |_,_|  |_____|  |_|  |_|    |___| |        
      |    |__|                                                       |        
      + ============================================================= +         



                        Press [ return ] to continue

                        
                     Press [ ctrl + c ] to quit anytime

\n`);

//
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  console.clear();
  console.log(introImg);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve();
    })
  );
}

export let intro = await askQuestion(" ");
