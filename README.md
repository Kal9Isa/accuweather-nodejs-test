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

and you shall have a _daily-forecast.json_ in the _root_ directory .

## Performance

Performing some tests around individual requests and whole app execution time yields great insights:

- Numbers in bold represent a VPS on ArvanCloud in NED region, while the normal text represents a PC on ADSL line.

| Number of days in month | Min time per request (ms) | Max time per request (ms) |
| ----------------------- | ------------------------- | ------------------------- |
| 1                       | 873.584 vs **270.046**    | 906.567 vs **404.247**    |
| 11                      | 763.262 vs **198.700**    | 1190 vs **333.343**       |
| 31                      | 730.213 vs **167.906**    | 1031 vs **437.867**       |

## View the logic diagram

Using [Draw.io](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) extension, navigate to _diagrams_ directory and click on the `.drawio` file to see the diagram in _VSCode_.

## Known Bugs

See [this list](https://github.com/Kal9Isa/accuweather-nodejs-test/issues).

## Todo

- Fix bugs
- Refactor to make the code easier to read
- Write tests if have enough time
- Increase the performance using worker pool.
