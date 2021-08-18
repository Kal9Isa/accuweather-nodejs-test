const cheerio = require('cheerio');
const { panelItemsEnum } = require('../assets/panelItemsEnum');

module.exports.dailyParser = (payload) => {
let dailyForecastData = {};

    const html = payload.data;
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

    //   Start index for left panel items
      let counter = 1;
      panelItemsL.each(function () {
        data[panelItemsEnum[counter]] = $(this).find('.value').text();
        counter++;
      });

      //   Start index for right panel items
      counter = 6;
      panelItemsR.each(function () {
        data[panelItemsEnum[counter]] = $(this).find('.value').text();
        counter++;
      });

      dailyForecastData[data.shortDate] = data;
}