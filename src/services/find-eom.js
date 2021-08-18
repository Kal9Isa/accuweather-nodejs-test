const cheerio = require('cheerio');

module.exports.findEoM = (payload) => {
  const html = payload.data;
  const $ = cheerio.load(html);
  const forecastDays = $('.monthly-daypanel > .monthly-panel-top > .date')
    .text()
    .split(/[\t\n]+/);

  // Return max value in array of days
  return Math.max.apply(null, forecastDays);
};
