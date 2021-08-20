const axios = require('axios');
const { dayParser } = require('./day-parser');

// Wrap all requests in promise and collect data afterwards
// Count of requests matches the result to equation below
// diff = End of Month (EoM) - today
module.exports.sendAllReqs = async (dailyForecastLinks, start, end) => {
  let reqs = [],
    index;
  const { offset, lastDay } = end;

  if (start === 1) {
    index = offset;
  } else index = 0;

  // Keep requsting until we reach EoM day
  for (index; index <= lastDay - start + offset; index++) {
    // Wrap all reqs in promise
    console.time();
    reqs.push(
      // https://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1
      await axios(`https://www.accuweather.com/${dailyForecastLinks[index]}`)
        // Extract data from daily forecast response
        .then((response) => dayParser(response))
        .catch(console.error)
    );
  }
  return await Promise.all(reqs);
};
