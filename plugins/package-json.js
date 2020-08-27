
const {readJson, writeJson} = require('fs-extra');
const {pick} = require('lodash');
const { join } = require('path');


 async function packageJsonHandler(config) {
  let pkg = await readJson(join(config.srcEntry, "package.json"));
  pkg = {
    ...pick(pkg, ["version", "name", "main", "licence", "dependencies"]),
    scripts: { start: pkg.scripts.start },
  };
  await writeJson(join(config.dist, "package.json"), pkg, { spaces: " " });
}
module.exports = packageJsonHandler