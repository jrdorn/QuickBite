#!/usr/bin/env node

import chalk from "chalk";
import { cli } from "../src/index.mjs";
import { Command } from "commander/esm.mjs";
const program = new Command();

program
  .description("an app for ordering pizza")
  .option("-p, --peppers", "add peppers");

program.parse();

const options = program.opts();
console.log(
  chalk.green(`\n
🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕

 _____           _           _      _____    _    _          
|     |   _ _   |_|   ___   | |_   | __  |  |_|  | |_    ___ 
|  |  |  | | |  | |  |  _|  | '_|  | __ -|  | |  |  _|  | -_|
|__  _|  |___|  |_|  |___|  |_,_|  |_____|  |_|  |_|    |___|
   |__|                                                                            


🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕

\n`)
);
// cli(chalk.yellow(process.argv[2]));
if (options.peppers) console.log("peppers");
