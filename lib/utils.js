'use strict';

module.exports = {
  log, initLogger
};

let devMode = true;

function log() {
  if (devMode) {
    for (let i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
  }
}

function initLogger(mode) {
  if (mode !== 'development') {
    devMode = false;
  }
}