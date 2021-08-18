const axios = require('axios');
const { dayParser } = require('./services/day-parser');
const { findEoM } = require('./services/find-eom');
const { monthlyParser } = require('./services/monthly-parser');

// Get URL from user
const weatherSrcURL =
  process.argv[2] != undefined
    ? process.argv[2]
    : 'https://www.accuweather.com/en/gb/london/ec4a-2/august-weather/328328';
// https://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1

// TODO Get current time to find day of month
const today = new Date().getDate();
// Can also find using "is-today" class on the elements after request

// TODO Send req to URL & fix a list of urls
// TODO Refactor

const sendAllReqs = async (links, diff) => {
  let reqs = [];
  for (let index = 0; index <= diff; index++) {
    reqs.push(
      await axios(`https://www.accuweather.com/${links[index]}`)
        .then((response) => dayParser(response))
        .catch(console.error)
    );
  }
  return await Promise.all(reqs);
};

const main = async () => {
  let dayLinks = [];
  await axios(weatherSrcURL)
    .then(async (response) => {
      // monhtly-parser
      dayLinks = monthlyParser(response);
      let lastDay = findEoM(response);
      let diffDaysCount = lastDay - today;
      let final = await sendAllReqs(dayLinks, diffDaysCount);
      console.log(final);
    })
    .catch(console.error);
};

main();

// TODO when all resolved save data in object & convert to JSON
// TODO Save JSON in file
// TODO bug fix
// TODO refactor
