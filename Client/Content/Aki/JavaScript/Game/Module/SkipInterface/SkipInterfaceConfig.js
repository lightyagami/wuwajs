"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipInterfaceConfig = undefined;
const AccessPathById_1 = require("../../../Core/Define/ConfigQuery/AccessPathById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkipInterfaceConfig extends ConfigBase_1.ConfigBase {
  GetAccessPathConfig(e) {
    return AccessPathById_1.configAccessPathById.GetConfig(e);
  }
}
exports.SkipInterfaceConfig = SkipInterfaceConfig;
//# sourceMappingURL=SkipInterfaceConfig.js.map