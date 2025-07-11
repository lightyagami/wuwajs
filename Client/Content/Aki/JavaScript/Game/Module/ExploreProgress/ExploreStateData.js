"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreStateData = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreStateData {
  constructor() {
    this.StateId = 0;
    this.CountryId = 0;
    this.StateNameKey = "TowerDefence_lock";
    this.IsNoneState = true;
    this.ExploreAreaDataList = [];
  }
  Initialize(e, t) {
    this.CountryId = t;
    if ((this.StateId = e) !== ExploreProgressDefine_1.NONE_STATE_ID) {
      this.IsNoneState = false;
      t = ConfigManager_1.ConfigManager.ExploreProgressConfig.GetStateConfigByStateId(e);
      this.StateNameKey = t.StateName;
    }
  }
  PushAreaData(e) {
    this.ExploreAreaDataList.push(e);
  }
  CheckPushAreaData(e) {
    return e.StateId === this.StateId && (this.PushAreaData(e), true);
  }
  HasCanTakeStageReward() {
    return this.ExploreAreaDataList.some(e => e.HasCanTakeStageReward());
  }
}
exports.ExploreStateData = ExploreStateData;
//# sourceMappingURL=ExploreStateData.js.map