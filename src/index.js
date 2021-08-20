const axios = require('axios');
const fs = require('fs');
const { findEoM } = require('./services/find-eom');
const { findSoM } = require('./services/find-som');
const { monthParser } = require('./services/month-parser');
const { sendAllReqs } = require('./services/send-all-reqs');
const { arrToJSON } = require('./helpers/array-to-json');

// Get URL from user or use default
const weatherSrcURL =
  process.argv[2] != undefined
    ? process.argv[2]
    : 'https://www.accuweather.com/en/gb/london/ec4a-2/august-weather/328328';

const main = async () => {
  await axios(weatherSrcURL)
    .then(async (response) => {
      // Get a list of all daily forecast links related to this month
      let dayLinks = monthParser(response);

      // Aggregate data from all daily forecast requests
      let final = await sendAllReqs(
        dayLinks,
        findSoM(weatherSrcURL),
        findEoM(response)
      );

      fs.writeFile('daily-forecast.json', arrToJSON(final), (err) => {
        if (err) {
          throw err;
        }
        console.log('JSON data is saved.');
      });
    })
    .catch(console.error);
};

main();
