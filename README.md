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

`$ npm start https://www.accuweather.com/en/gb/london/ec4a-2/august-weather/328328`

- If no args given, the URL given in instrauctions will be used as default.

and you shall have a _daily-forecast.json_ in the _root_ directory in about sweet **800 ms** per day _Pffffft ... Slow, I know :/_

## View the logical flow diagram

Using [Draw.io](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) extension, navigate to _diagrams_ directory and click on the `.drawio` file to see the diagram in _VSCode_.

## Known Bugs

See [this list](https://github.com/Kal9Isa/accuweather-nodejs-test/issues).

## Todo

- Fix bugs
- Refactor to make the code easier to read
- Write tests if have enough time
- Increase the performance using worker pool.
