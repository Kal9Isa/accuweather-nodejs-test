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
const getDailyForecast = (dayURL) => {
  axios(`https://www.accuweather.com/${dayURL}`)
    .then((response) => {
      // daily-parser
      dailyParser(response)
    })
    .catch(console.error);
};

const assembleData = async (links) => {
  links.forEach((link) => getDailyForecast(link));
};

const main = async () => {

  let links = []
  await axios(weatherSrcURL)
    .then((response) => {
      // monhtly-parser
      links = monthlyParser(response)
    })
    .catch(console.error);

  await assembleData(links);
  // TODO Send req for each day (*run multi-threaded) only in current month
};

main();
// TODO Extract content
// TODO Save Object in a JSON file
