import chalk from "chalk";
import process from "process";
import readline from "readline";

//ASCII image to display on start
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

//wait to start until user presses return
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pressStart(query) {
  console.clear();
  console.log(introImg);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, () => {
      rl.close();
      resolve();
    })
  );
}

export let intro = await pressStart(" ");
