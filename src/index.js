// TODO Get URL from user
const weatherSrcURL =
  process.argv[2] != undefined
    ? process.argv[2]
    : 'https://www.accuweather.com/en/gb/london/ec4a-2/august-weather/328328';

// TODO Get current time to find day of month
// TODO Send req to URL
// TODO Find End of Month - EoM index
// TODO Diff the EoM from current day
// TODO Send req for each day (*run multi-threaded)
// TODO Extract content
// TODO Save Object in a JSON file
