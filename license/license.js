const inputJSON = require('./license.json');
const fs = require('fs');

const outputJSON = [];

for (const [, value] of Object.entries(inputJSON)) {
  outputJSON.push({ name: value.name, licenseText: value.licenseText });
}

fs.writeFileSync('./license/license.json', JSON.stringify(outputJSON, null, '\t'));