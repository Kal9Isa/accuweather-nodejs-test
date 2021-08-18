const axios = require('axios');
const fs = require('fs');
const { dayParser } = require('./services/day-parser');
const { findEoM } = require('./services/find-eom');
const { monthParser } = require('./services/month-parser');

// Get URL from user
const weatherSrcURL =
  process.argv[2] != undefined
    ? process.argv[2]
    : 'https://www.accuweather.com/en/gb/london/ec4a-2/august-weather/328328';

// Get current time to find day of month
const today = new Date().getDate();
// Can also find using "is-today" class on the elements after request

const sendAllReqs = async (links, diff) => {
  let reqs = [];
  for (let index = 0; index <= diff; index++) {
    reqs.push(
      // https://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1
      await axios(`https://www.accuweather.com/${links[index]}`)
        .then((response) => dayParser(response))
        .catch(console.error)
    );
  }
  return await Promise.all(reqs);
};

const arrToJSON = (arr) => {
  let dataObj = {};
  arr.forEach((element) => {
    dataObj[element.shortDate] = element;
  });
  return JSON.stringify(dataObj);
};

const main = async () => {
  let dayLinks = [];
  await axios(weatherSrcURL)
    .then(async (response) => {
      // monhtly-parser
      dayLinks = monthParser(response);
      let lastDay = findEoM(response);
      let diffDaysCount = lastDay - today;
      let final = await sendAllReqs(dayLinks, diffDaysCount);
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

// FIXME incorrect data entries
// TODO refactor
