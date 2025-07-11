"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldLevelConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const WorldLevelById_1 = require("../../../Core/Define/ConfigQuery/WorldLevelById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WorldLevelConfig extends ConfigBase_1.ConfigBase {
  GetWorldLevelConfig(e) {
    var o = WorldLevelById_1.configWorldLevelById.GetConfig(e);
    if (o) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WorldLevel", 18, "找不到worldLevel = 的配置", ["worldLevel", e]);
    }
  }
  GetCommonValue(e) {
    return CommonParamById_1.configCommonParamById.GetIntConfig(e);
  }
}
exports.WorldLevelConfig = WorldLevelConfig;
//# sourceMappingURL=WorldLevelConfig.js.map