#!/usr/bin/env node

const { writeJSONSync, pathExistsSync } = require("fs-extra");
const { join } = require("path");

process.chdir(process.cwd());
if (process.argv.includes("--init")) {
  const path = join(process.cwd(), "bundler.config.json");
  if (pathExistsSync(path)) {
    console.log("Config file already exists %s", path);
    return;
  }
  writeJSONSync(
    path,
    {
      dist: "",
      files: [],
      ignore: [],
      plugins: {},
    },
    { spaces: " " },
  );
  console.log("Created config file %s", path);
  return;
}
require("../lib").init();
