const saveFile = require('fs').writeFileSync;

const pkgJsonPath = require.main.paths[0].split('node_modules')[0] + 'package.json';

const json = require(pkgJsonPath);

if (!json.hasOwnProperty('scripts')) {
    json.scripts = {};
}

json.scripts['min-css'] = 'node ./node_modules/min-css/index.js';

saveFile(pkgJsonPath, JSON.stringify(json, null, 2));