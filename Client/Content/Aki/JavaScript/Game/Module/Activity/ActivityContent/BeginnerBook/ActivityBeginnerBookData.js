"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBeginnerBookData = undefined;
const ConfigCommon_1 = require("../../../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityBeginnerBookData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.AllBeginnerTargetList = [];
    this.UnLockBeginnerMap = new Map();
    this.FinishBeginnerMap = new Map();
  }
  PhraseEx(t) {
    this.AllBeginnerTargetList = [];
    var e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetAllActivityBeginnerConfig());
    e?.sort((t, e) => t.Sort - e.Sort);
    for (const i of e) {
      this.AllBeginnerTargetList.push(i.Id);
    }
  }
  GetExDataFinishShowState() {
    for (const t of this.AllBeginnerTargetList) {
      if (!this.GetFinishState(t)) {
        return false;
      }
    }
    return true;
  }
  GetEnableJump(t) {
    return ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(t).ConditionId === 0 || (this.UnLockBeginnerMap.get(t) ?? false);
  }
  GetFinishState(t) {
    return this.FinishBeginnerMap.get(t) ?? false;
  }
}
exports.ActivityBeginnerBookData = ActivityBeginnerBookData;
//# sourceMappingURL=ActivityBeginnerBookData.js.map