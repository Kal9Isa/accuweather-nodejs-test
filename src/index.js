const axios = require('axios');
const cheerio = require('cheerio');

const keyEnum = {
  1: 'Wind',
  2: 'Wind Gusts',
  3: 'Probability of Precipitation',
  4: 'Probability of Thunderstorms',
  5: 'Precipitation',
  6: 'Rain',
  7: 'Hours of Precipitation',
  8: 'Hours of Rain',
  9: 'Cloud Cover',
};

let dailyForecastData = {};

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
      const html = response.data;
      const $ = cheerio.load(html);
      const dailyForecast = $('.half-day-card');

      const panelItemsL = $(dailyForecast).find(
        '.half-day-card-content > .panels > .left > .panel-item'
      );

      const panelItemsR = $(dailyForecast).find(
        '.half-day-card-content > .panels > .right > .panel-item'
      );

      const data = {
        daytime: $(dailyForecast).find('.half-day-card-header > .title').text(),
        temperature: $(dailyForecast)
          .find('.half-day-card-header > .temperature')
          .text()
          .trim(),
        realFeel: $(dailyForecast)
          .find('.half-day-card-header > .real-feel > div')
          .text()
          .trim(),
        shortDate: $(dailyForecast)
          .find('.half-day-card-header > .short-date > div')
          .text()
          .trim(),
        phrase: $(dailyForecast)
          .find('.half-day-card-content > .phrase')
          .text()
          .trim(),
      };

      let counter = 1;
      panelItemsL.each(function () {
        data[keyEnum[counter]] = $(this).find('.value').text();
        counter++;
      });

      counter = 6;
      panelItemsR.each(function () {
        data[keyEnum[counter]] = $(this).find('.value').text();
        counter++;
      });

      dailyForecastData[data.shortDate] = data;
    })
    .catch(console.error);
};

const assembleData = async (links) => {
  links.forEach((link) => getDailyForecast(link));
  console.log(dailyForecastData);
};

const main = async () => {
  const links = [];

  await axios(weatherSrcURL)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const forecastDays = $('.monthly-daypanel');

      forecastDays.each(function () {
        let link = $(this).attr('href');
        if (link) links.push(link);
      });
    })
    .catch(console.error);

  await assembleData(links);
  // TODO Send req for each day (*run multi-threaded) only in current month
  // getDailyForecast(links[0]);
};

main();
// TODO Extract content
// TODO Save Object in a JSON file
