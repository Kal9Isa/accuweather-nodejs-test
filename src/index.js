const axios = require('axios');
const { dailyParser } = require('./services/daily-parser');
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

// const sendAllReqs = (links) => {
//   links.forEach(async (link) => {
//     let miniPromise = await axios(`https://www.accuweather.com/${dayURL}`)
//       .then((response) => {
//         // daily-parser
//         dailyParser(response);
//       })
//       .catch(console.error);
//   });
// };

const main = async () => {
  let dayLinks = [];
  await axios(weatherSrcURL)
    .then((response) => {
      // monhtly-parser
      dayLinks = monthlyParser(response);
    })
    .catch(console.error);
  // sendAllReqs(dayLinks);
};

main();

// TODO find EoM
// TODO find diff of EoM and today
// TODO Make reqs to match count of diff and wrap each in promise
// TODO when all resolved save data in object & convert to JSON
// TODO Save JSON in file
// TODO bug fix
// TODO refactor
