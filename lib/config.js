'use strict';

const fs = require('fs');
const path = require('path');

const self = {
  PORT: 3031
};

/** override server specific configuration */
const pathToJson = path.join(__dirname, '..', 'locals', 'config.json');
try {
  const jsonConfig = fs.readFileSync(pathToJson, 'utf-8');
  const serverSettings = JSON.parse(jsonConfig);
  Object.assign(self, serverSettings);
} catch (e) {
  console.error(e, 'no local server config');
}

module.exports = self;
