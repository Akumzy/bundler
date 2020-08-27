import { copy, mkdir, pathExists, remove } from "fs-extra";
import { join } from "path";
export interface IConfig {
  dist: string;
  srcEntry: string;
  files: string[];
  ignore: string[];
  plugins: {
    [filename: string]: {
      handler: string;
    };
  };
}
export type IHandler = (config: IConfig) => Promise<void>;

export async function init() {
  const srcEntry = process.cwd();
  const config: IConfig = require("../bundler.config.json");

  config.dist = join(srcEntry, config.dist);
  config.srcEntry = srcEntry;

  if (await pathExists(config.dist)) {
    await remove(config.dist);
    await mkdir(config.dist);
  }
  for (const file of config.files) {
    if (config.ignore?.includes(file)) continue;
    if (file in config.plugins) {
      let pluginName = config.plugins[file].handler;
      pluginName = pluginName.startsWith(".")
        ? join(srcEntry, pluginName)
        : pluginName;
      const handler: IHandler =
        typeof require(pluginName) === "function"
          ? require(pluginName)
          : require(pluginName).default;
      await handler(config);
      continue;
    }
    await copy(join(config.srcEntry, file), join(config.dist, file), {
      recursive: true,
    });
  }
  console.log("Done bundling files");
}
