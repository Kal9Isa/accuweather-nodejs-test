const cheerio = require('cheerio');

module.exports.monthParser = (payload) => {
  let links = [];
  const html = payload.data;
  const $ = cheerio.load(html);
  const forecastDays = $('.monthly-daypanel');

  forecastDays.each(function () {
    let link = $(this).attr('href');
    if (link) links.push(link);
  });

  return links;
};
