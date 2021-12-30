import { getMACAddress } from "./getMACAddress.mjs";
import { getCoords } from "./getCoords.mjs";
import { getAddress } from "./getAddress.mjs";
import chalk from "chalk";
import listr from "listr";

let myMACs;

//handle geolocation and display progress to user
export const geo = new listr([
  {
    title: chalk.yellowBright.bold("Get MAC addresses"),
    task: async () => {
      console.clear();
      console.log("\n");
      myMACs = await getMACAddress();
    },
  },
  {
    title: chalk.greenBright.bold("Get geocoordinates from MACs"),
    task: async (ctx) => {
      ctx.myCoords = await getCoords(myMACs);
    },
  },
  {
    title: chalk.blueBright.bold("Get address from geocoordinates"),
    task: async (ctx) => {
      ctx.addr = await getAddress(ctx.myCoords);
    },
  },
  {
    title: chalk.magentaBright.bold(`Format address`),
    task: (ctx) => {
      ctx.addr = ctx.addr.results[0].formatted_address;
    },
  },
]);
