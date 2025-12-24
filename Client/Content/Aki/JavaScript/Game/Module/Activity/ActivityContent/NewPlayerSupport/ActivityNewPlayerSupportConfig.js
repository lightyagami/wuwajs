"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportConfig = undefined;
const ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById");
const NewPlayerSupportTaskAll_1 = require("../../../../../Core/Define/ConfigQuery/NewPlayerSupportTaskAll");
const NewPlayerSupportTaskById_1 = require("../../../../../Core/Define/ConfigQuery/NewPlayerSupportTaskById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class ActivityNewPlayerSupportConfig extends ConfigBase_1.ConfigBase {
  GetTaskConfig(e) {
    return NewPlayerSupportTaskById_1.configNewPlayerSupportTaskById.GetConfig(e);
  }
  GetAllTaskConfigs() {
    return NewPlayerSupportTaskAll_1.configNewPlayerSupportTaskAll.GetConfigList();
  }
  GetTrialRoleUnlockDesc() {
    var e = new Map();
    for (const o of this.GetAllTaskConfigs() ?? []) {
      var r = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(o.ConditionGroup).HintText;
      e.set(o.TrialRoleGroupId, r);
    }
    return e;
  }
  GetConditionGroup(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
}
exports.ActivityNewPlayerSupportConfig = ActivityNewPlayerSupportConfig;
//# sourceMappingURL=ActivityNewPlayerSupportConfig.js.map