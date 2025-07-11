"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConditionById_1 = require("../../../Core/Define/ConfigQuery/ConditionById");
const ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ConditionConfig extends ConfigBase_1.ConfigBase {
  GetConditionGroupConfig(o) {
    var n = ConditionGroupById_1.configConditionGroupById.GetConfig(o);
    if (n) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "获取条件组配置错误", ["conditionGroupId", o]);
    }
  }
  GetConditionConfig(o) {
    var n = ConditionById_1.configConditionById.GetConfig(o);
    if (n) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "获取条件配置错误", ["conditionId", o]);
    }
  }
  GetConditionConfigByType(o, n) {
    for (const e of this.GetConditionGroupConfig(o).GroupId) {
      var i = this.GetConditionConfig(e);
      if (n === i.Type) {
        return i;
      }
    }
  }
  GetGroupConditionIds(o) {
    o = this.GetConditionGroupConfig(o);
    if (o) {
      return o.GroupId;
    } else {
      return [];
    }
  }
}
exports.ConditionConfig = ConditionConfig;
//# sourceMappingURL=ConditionConfig.js.map