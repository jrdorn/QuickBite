#!/usr/bin/env node

import { Command } from "commander/esm.mjs";
const program = new Command();

program
  .description("an app for ordering pizza")
  .option("-p, --peppers", "add peppers");

program.parse();

const options = program.opts();
console.log("\nyou ordered a pizza with:\n");
if (options.peppers) console.log("peppers");
