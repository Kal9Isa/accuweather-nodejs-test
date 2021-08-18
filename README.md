# Test project

## Topic

Get daily forecast data for the current month from [Accuweather](https://www.accuweather.com/) and
save the results in a _JSON_ file.

## Setup

Clone the project, navigate into the and run _accuweather-nodejs-test_ directory and run

`$ npm i `

Make sure you have the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslintlink) and [Draw.io](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) extensions installed if on _VSCode_.

## See the magic! :P

Run

`$ npm start <custom url of accuweather>`

and you shall have a _daily-forecast.json_ in the _root_ directory in about sweet **11.6 s**

## Known Bugs

1. Data extracted is not valid and needs heavy grooming.
2. When given a fresh month, it fails to load data properly due to starting from today time.
3. Crashes on bad URL due to poor error handling

## Todo

- Fix bug #1
- Fix bug #2
- Fix bug #3
- Refactor to make the code easier to read
- Write tests if have enough time
