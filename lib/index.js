"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
async function init() {
    var _a;
    const srcEntry = process.cwd();
    const config = require("../bundler.config.json");
    config.dist = path_1.join(srcEntry, config.dist);
    config.srcEntry = srcEntry;
    if (await fs_extra_1.pathExists(config.dist)) {
        await fs_extra_1.remove(config.dist);
        await fs_extra_1.mkdir(config.dist);
    }
    for (const file of config.files) {
        if ((_a = config.ignore) === null || _a === void 0 ? void 0 : _a.includes(file))
            continue;
        if (file in config.plugins) {
            let pluginName = config.plugins[file].handler;
            pluginName = pluginName.startsWith(".")
                ? path_1.join(srcEntry, pluginName)
                : pluginName;
            const handler = typeof require(pluginName) === "function"
                ? require(pluginName)
                : require(pluginName).default;
            await handler(config);
            continue;
        }
        await fs_extra_1.copy(path_1.join(config.srcEntry, file), path_1.join(config.dist, file), {
            recursive: true,
        });
    }
    console.log("Done bundling files");
}
exports.init = init;
//# sourceMappingURL=index.js.map