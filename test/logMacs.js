import wifiscanner from "node-wifiscanner";

//find MAC addresses of nearby WiFi access points
const getMACAddress = () => {
  return new Promise((resolve, reject) => {
    wifiscanner.scan((err, data) => {
      if (err) {
        reject(console.error());
      } else {
        //format MAC addresses for Google Geolocation API
        let macs = data.map((a) => {
          let macsObj = {};
          //WiFi access point objects must have macAddress field
          macsObj["macAddress"] = a.mac;
          return macsObj;
        });
        console.log(macs);
      }
    });
  });
};
getMACAddress();
