module.exports.arrToJSON = (arr) => {
  let dataObj = {};
  arr.forEach((item) => {
    // Set the date as key for daily forecast data obj
    dataObj[item.shortDate] = item;
  });
  return JSON.stringify(dataObj);
};
