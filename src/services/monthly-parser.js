const cheerio = require('cheerio')

module.exports.monthlyParser = (payload) => {
    const html = payload.data;
      const $ = cheerio.load(html);
      const forecastDays = $('.monthly-daypanel');

      forecastDays.each(function () {
        let link = $(this).attr('href');
        if (link) links.push(link);
      });
}