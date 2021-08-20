// Get current time to find day of month

const { monthEnum } = require('../assets/monthEnum');

// Can also find using "is-today" class on the elements after request

module.exports.findSoM = (url) => {
  let dateOfNow = new Date();
  const today = { day: dateOfNow.getUTCDate(), month: dateOfNow.getUTCMonth() };
  if (url.includes(monthEnum[today.month])) {
    return today.day;
  } else return 1;
};
