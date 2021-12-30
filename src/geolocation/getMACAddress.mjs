import boxen from "boxen";
import chalk from "chalk";
import wifiscanner from "node-wifiscanner";

//find MAC addresses of nearby WiFi access points
export const getMACAddress = () => {
  return new Promise((resolve, reject) => {
    wifiscanner.scan((err, data) => {
      if (err) {
        reject(
          console.error(
            chalk.red(
              boxen(`Error: ${err}`, { padding: 1, borderStyle: "round" })
            )
          )
        );
      } else {
        //format MAC addresses for Google Geolocation API
        let macs = data.map((a) => {
          let macsObj = {};
          //WiFi access point objects must have macAddress field
          macsObj["macAddress"] = a.mac;
          return macsObj;
        });
        //
        resolve(macs);
      }
    });
  });
};
