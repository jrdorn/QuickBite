#!/usr/bin/env node

import chalk from "chalk";
import { cli } from "../src/index.mjs";
import { Command } from "commander/esm.mjs";

import dotenv from "dotenv"; //store API keys in the environment
const config = dotenv.config();
if (config.error) {
  throw config.error;
}
// console.log(config.parsed.MAPS_KEY);

//get IPv6, OS specific

const program = new Command();

program
  .description("an app for ordering pizza")
  .option("-p, --peppers", "add peppers");

program.parse();

const options = program.opts();
console.log(
  chalk.yellow(`\n
🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕

 _____           _           _      _____    _    _          
|     |   _ _   |_|   ___   | |_   | __  |  |_|  | |_    ___ 
|  |  |  | | |  | |  |  _|  | '_|  | __ -|  | |  |  _|  | -_|
|__  _|  |___|  |_|  |___|  |_,_|  |_____|  |_|  |_|    |___|
   |__|                                                                            


🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕

\n`)
);

//sample animation
var twirlTimer = (function () {
  var P = ["\\", "|", "/", "-"];
  var x = 0;
  return setInterval(function () {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 250);
})();

// cli(chalk.yellow(process.argv[2]));
if (options.peppers) console.log("peppers");
