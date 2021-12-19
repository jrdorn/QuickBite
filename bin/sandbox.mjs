#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import dotenv from "dotenv"; //store API keys in the environment
import fetch from "node-fetch";

//google api key
const config = dotenv.config();
if (config.error) {
  throw config.error;
}

//||
enterAddress();
