const cheerio = require('cheerio');
const { panelItemsEnum } = require('../assets/panelItemsEnum');

module.exports.dayParser = (payload) => {
  const html = payload.data;
  const $ = cheerio.load(html);
  const dailyForecast = $('.half-day-card');

  // Extract data from left-panel class
  const panelItemsL = $(dailyForecast).find(
    '.half-day-card-content > .panels > .left > .panel-item'
  );

  // Extract data from right-panel class
  const panelItemsR = $(dailyForecast).find(
    '.half-day-card-content > .panels > .right > .panel-item'
  );

  // Extract and groom data from header card
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

  // Start index for left panel items
  // Enumerate data with correct keys
  // My god the dev for this site was lazy! :/
  let counter = 1;
  panelItemsL.each(function () {
    data[panelItemsEnum[counter]] = $(this).find('.value').text();
    counter++;
  });

  // Start index for right panel items
  // Enumerate data with correct keys
  counter = 6;
  panelItemsR.each(function () {
    data[panelItemsEnum[counter]] = $(this).find('.value').text();
    counter++;
  });

  console.timeEnd();
  return data;
};
