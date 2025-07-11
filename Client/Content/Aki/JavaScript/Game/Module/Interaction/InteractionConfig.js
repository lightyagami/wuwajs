"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const InteractDataByGuid_1 = require("../../../Core/Define/ConfigQuery/InteractDataByGuid");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class InteractionConfig extends ConfigBase_1.ConfigBase {
  GetInteractionConfig(e) {
    var t = InteractDataByGuid_1.configInteractDataByGuid.GetConfig(e, false);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 42, "找不到交互配置", ["Interact GUID", e]);
      }
    }
    return t;
  }
}
exports.InteractionConfig = InteractionConfig;
//# sourceMappingURL=InteractionConfig.js.map