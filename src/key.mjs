import dotenv from "dotenv";

//get Google Maps API Key from env
const config = dotenv.config();
if (config.error) {
  throw config.error;
}

export const key = config.parsed.MAPS_KEY;
