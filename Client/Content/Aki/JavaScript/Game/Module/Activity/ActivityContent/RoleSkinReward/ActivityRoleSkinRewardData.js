"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleSkinRewardData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityRoleSkinRewardController_1 = require("./ActivityRoleSkinRewardController");
class ActivityRoleSkinRewardData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.T1g = new Map();
  }
  PhraseEx(t) {
    for (const e of t.jag?.W0c) {
      this.T1g.set(e.v9n, e.Y4n);
    }
  }
  UpdateSkinRewardState(t, e) {
    this.T1g.set(t, e);
  }
  GetSkinRewardState(t) {
    return this.T1g.get(t);
  }
  CheckTransitionCondition(t) {
    return this.T1g.get(t) === Protocol_1.Aki.Protocol.Wag.Proto_InitState;
  }
  CheckRewarded(t) {
    return this.T1g.get(t) === Protocol_1.Aki.Protocol.Wag.Proto_TaskRewarded;
  }
  GetExDataFinishShowState() {
    var t = ActivityRoleSkinRewardController_1.ActivityRoleSkinRewardController.ActivityId;
    var t = ConfigManager_1.ConfigManager.ActivityRoleSkinRewardConfig.GetActivityConfig(t);
    return this.T1g.get(t.Id) === Protocol_1.Aki.Protocol.Wag.Proto_TaskRewarded;
  }
  GetExDataRedPointShowState() {
    var t = ActivityRoleSkinRewardController_1.ActivityRoleSkinRewardController.ActivityId;
    var t = ConfigManager_1.ConfigManager.ActivityRoleSkinRewardConfig.GetActivityConfig(t);
    return this.T1g.get(t.Id) === Protocol_1.Aki.Protocol.Wag.Proto_TaskComplete;
  }
}
exports.ActivityRoleSkinRewardData = ActivityRoleSkinRewardData;
//# sourceMappingURL=ActivityRoleSkinRewardData.js.map