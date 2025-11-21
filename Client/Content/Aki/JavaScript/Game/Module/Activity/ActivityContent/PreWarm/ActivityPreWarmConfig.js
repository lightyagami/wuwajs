"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPreWarmConfig = undefined;
const PreHeatTaskActivityById_1 = require("../../../../../Core/Define/ConfigQuery/PreHeatTaskActivityById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityPreWarmConfig extends ConfigBase_1.ConfigBase {
  GetPreWarmConfig(e) {
    return PreHeatTaskActivityById_1.configPreHeatTaskActivityById.GetConfig(e);
  }
}
exports.ActivityPreWarmConfig = ActivityPreWarmConfig;
//# sourceMappingURL=ActivityPreWarmConfig.js.map