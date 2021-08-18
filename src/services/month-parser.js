const cheerio = require('cheerio');

module.exports.monthParser = (payload) => {
  let links = [];
  const html = payload.data;
  const $ = cheerio.load(html);
  const forecastDays = $('.monthly-daypanel');

  // Extract links to all daily forecasts available on the page
  forecastDays.each(function () {
    let link = $(this).attr('href');
    if (link) links.push(link);
  });

  return links;
};
