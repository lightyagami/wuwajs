"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleTrialData = exports.stateResolver = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
exports.stateResolver = {
  [Protocol_1.Aki.Protocol.Lps.Proto_Running]: 0,
  [Protocol_1.Aki.Protocol.Lps.Proto_WaitTakeReward]: 1,
  [Protocol_1.Aki.Protocol.Lps.a3_]: 2
};
class ActivityRoleTrialData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.RoleIdList = [];
    this.RoleTrialIdList = [];
    this.TrialToIdMap = new Map();
    this.Z2e = new Map();
    this.CurrentRoleId = 0;
    this.eFe = 0;
  }
  SetRoleTrialState(t) {
    this.eFe = t;
  }
  IsRolePreviewOn() {
    return this.eFe === 2;
  }
  IsRoleInstanceOn() {
    return this.eFe === 3;
  }
  PhraseEx(t) {
    if (this.CheckIfInShowTime()) {
      ActivityRoleTrialController_1.ActivityRoleTrialController.CurrentActivityId = t.s5n;
    }
    this.RoleIdList.length = 0;
    this.RoleTrialIdList.length = 0;
    t = t.Vps;
    if (t) {
      for (const o of t.Rps) {
        var e = exports.stateResolver[o.Lps];
        var r = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(o.Q6n);
        this.RoleTrialIdList.push(r.TrialRoleId);
        this.RoleIdList.push(o.Q6n);
        this.TrialToIdMap.set(r.TrialRoleId, o.Q6n);
        this.Z2e.set(o.Q6n, e);
      }
    }
  }
  GetRewardStateByRoleId(t) {
    return this.Z2e.get(t) ?? 0;
  }
  SetRewardStateByRoleId(t, e) {
    this.Z2e.set(t, e);
  }
  GetInstanceIdByRoleId(t) {
    return ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(t)?.InstanceId;
  }
  GetRewardDataByRoleId(t) {
    var e = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(t);
    if (e && e.RewardItem) {
      var r;
      var o;
      var i = this.GetRewardStateByRoleId(t);
      var a = [];
      for ([r, o] of e.RewardItem) {
        var n = [{
          IncId: 0,
          ItemId: r
        }, o];
        a.push({
          Item: n,
          HasClaimed: i === 2
        });
      }
      return a;
    }
  }
  GetConfigByRoleAndInstance(t, e) {
    for (const o of this.RoleIdList) {
      var r = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(o);
      if (r && r.RoleId === t && r.InstanceId === e) {
        return r;
      }
    }
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  GetExDataRedPointShowState() {
    for (var [, t] of this.Z2e) {
      if (t === 1) {
        return true;
      }
    }
    return false;
  }
}
exports.ActivityRoleTrialData = ActivityRoleTrialData;
//# sourceMappingURL=ActivityRoleTrialData.js.map