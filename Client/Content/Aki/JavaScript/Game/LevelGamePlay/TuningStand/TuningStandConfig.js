"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TuningNodeByAll_1 = require("../../../Core/Define/ConfigQuery/TuningNodeByAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class TuningStandConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.CacheMap = undefined;
  }
  GetEvent(e) {
    if (!this.CacheMap) {
      this.CacheMap = new Map();
      for (const n of TuningNodeByAll_1.configTuningNodeByAll.GetConfigList()) {
        this.CacheMap.set(n.Desc, n.AkEvent);
      }
    }
    var o = this.CacheMap.get(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 77, "No TuningNode Config", ["TuningNode", e]);
      }
    }
    return o;
  }
}
exports.TuningStandConfig = TuningStandConfig;
//# sourceMappingURL=TuningStandConfig.js.map