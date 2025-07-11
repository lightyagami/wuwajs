"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityUniversalConfig = undefined;
const UniversalActivityById_1 = require("../../../../../Core/Define/ConfigQuery/UniversalActivityById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityUniversalConfig extends ConfigBase_1.ConfigBase {
  GetActivityUniversalConfig(e) {
    return UniversalActivityById_1.configUniversalActivityById.GetConfig(e);
  }
}
exports.ActivityUniversalConfig = ActivityUniversalConfig;
//# sourceMappingURL=ActivityUniversalConfig.js.map