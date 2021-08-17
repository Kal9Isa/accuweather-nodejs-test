const axios = require('axios');
const cheerio = require('cheerio');

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
};

main();
// TODO Send req for each day (*run multi-threaded)
// TODO Extract content
// TODO Save Object in a JSON file
