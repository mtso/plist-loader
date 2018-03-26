'use strict';

const plist = require('plist');

module.exports = function(raw) {
  const json = plist.parse(raw);
  const properties = JSON.stringify(json);
  return `module.exports = ${properties};`
}
