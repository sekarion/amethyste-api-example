# amethyste-api-example

## Requirements

### Nodejs

Atleast nodejs version 12.x.x is required
get it from [here](https://nodejs.org/en/download/)

### Any nodejs package manager

#### NPM

It is installed by default with nodejs.

[NPM-Docs](https://docs.npmjs.com/)

#### YARN

Can be installed with npm: `npm i -g yarn` (Might require admin authorizations depending on your system configuration)

[YARN-Docs](https://yarnpkg.com/getting-started/)

#### PNPM

Can be installed with npm: `npm i -g pnpm` (Might require admin authorizations depending on your system configuration)

[PNPM-Docs](https://pnpm.js.org/en/installation/)

### Améthyste API Key

If you don't have an API Key get it from [here](https://api.amethyste.moe/register)

## Getting started with example bot

### Installing required packages

#### Using NPM

Run: `npm ci` (for npm@6.x.x or above for older versions use: `npm install --production`) and it will install all the required packages.

#### Using YARN

Run: `yarn install --prod` and it will install all the required packages.

#### Using PNPM

Run: `pnpm install --prod` and it will install all the required packages.

### Updating configuration file

Edit: `config/config.example.js` here,

prefix: your bot's prefix

token: your bot's token, can be found at discord developers page

ameToken: your Améthyste API Key  

Rename: config.example.js to config.js

### Running the bot

Run: `node app.js`
