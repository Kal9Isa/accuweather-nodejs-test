const cheerio = require('cheerio');

module.exports.findEoM = (payload) => {
  const html = payload.data;
  const $ = cheerio.load(html);
  const forecastDays = $('.monthly-daypanel > .monthly-panel-top > .date')
    .text()
    // Remove tabs and newline chars from data
    .split(/[\t\n]+/);

  let firstDay = forecastDays.indexOf('1');

  if (firstDay <= 7) {
    forecastDays.splice(0, firstDay);
  }

  // Return number of days counted as offset in array of days or links to reach the 1st day of month
  // and max value in array of days which would be last day of month
  return { offset: firstDay - 1, lastDay: Math.max.apply(null, forecastDays) };
};
