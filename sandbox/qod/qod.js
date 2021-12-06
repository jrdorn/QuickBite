#!/usr/bin/env node

const axios = require("axios");
const chalk = require("chalk");

const url = "https://quotes.rest/qod";

//make a get request to the url
axios({
  method: "get",
  url: url,
  headers: { Accept: "application/json" },
})
  .then((res) => {
    const quote = res.data.contents.quotes[0].quote;
    const author = res.data.contents.quotes[0].author;
    const log = chalk.cyan(`${quote} - ${author}`);
    console.log(log);
    const arg = chalk.magenta(process.argv);
    console.log(arg);
  })
  .catch((err) => {
    const log = chalk.blue(err);
    console.log(log);
  });
