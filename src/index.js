// console.time();
const axios = require('axios');
const fs = require('fs');
const { findEoM } = require('./services/find-eom');
const { findSoM } = require('./services/find-som');
const { dayParser } = require('./services/day-parser');
const { monthParser } = require('./services/month-parser');

// Get URL from user or use default
const weatherSrcURL =
  process.argv[2] != undefined
    ? process.argv[2]
    : 'https://www.accuweather.com/en/gb/london/ec4a-2/august-weather/328328';

// Wrap all requests in promise and collect data afterwards
// Count of requests matches the result to equation below
// diff = End of Month (EoM) - today
const sendAllReqs = async (dailyForecastLinks, start, end) => {
  let reqs = [],
    index;

  if (start === 1) {
    index = end.offset;
  } else index = 0;

  // Keep requsting until we reach EoM day
  // for (index; index <= end.lastDay - start + end.offset; index++) {
  for (index = 0; index < 1; index++) {
    // Wrap all reqs in promise
    console.time();
    reqs.push(
      // https://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1
      await axios(`https://www.accuweather.com/${dailyForecastLinks[index]}`)
        // Extract data from daily forecast response
        .then((response) => dayParser(response))
        .catch(console.error)
    );
  }
  return await Promise.all(reqs);
};

const arrToJSON = (arr) => {
  let dataObj = {};
  arr.forEach((item) => {
    // Set the date as key for daily forecast data obj
    dataObj[item.shortDate] = item;
  });
  return JSON.stringify(dataObj);
};

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
        // Timer for execution time track
        // console.timeEnd();
      });
    })
    .catch(console.error);
};

main();

// FIXME incorrect data entries
// TODO refactor
