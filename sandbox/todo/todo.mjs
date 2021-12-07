#!/usr/bin/env node

import chalk from "chalk";

import * as rl from "readline";
import * as low from "lowdb";
const FileSync = require("lowdb/lib/adapters/JSONFileSync.js");
const adapter = new FileSync("db.json");
const db = low(adapter);
//
db.defaults({ todos: [] }).write();
//

const args = process.argv;

//|| Manual
const manual = function () {
  const manText = `
  a simple todo list

    todo <command>

    new:       create a new todo
    get:       retrieve your todos
    complete:  mark a todo as complete
    help:      print the usage manual

  `;

  console.log(manText);
};

//|| Handle Errors
function errorLog(error) {
  const eLog = chalk.green(error);
  console.log(eLog);
}

//throw error if more than one argument entered
if (args.length > 3) {
  errorLog(`\n\n Only one argument can be accepted`);
  manual();
}

//|| Handle Commands
switch (args[2]) {
  case "help":
    manual();
    break;
  case "new":
    break;
  case "get":
    break;
  case "complete":
    break;
  default:
    errorLog("\n\nInvalid command");
    manual();
}
