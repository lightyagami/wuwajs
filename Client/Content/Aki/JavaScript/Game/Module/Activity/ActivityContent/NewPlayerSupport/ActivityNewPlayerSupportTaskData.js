"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportTaskData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class ActivityNewPlayerSupportTaskData {
  constructor(t) {
    this.Id = undefined;
    this.TaskConfig = undefined;
    this.hTc = undefined;
    this.Jqf = 0;
    this._Tc = 0;
    this.Id = t;
    this.TaskConfig = ConfigManager_1.ConfigManager.ActivityNewPlayerSupportConfig.GetTaskConfig(t);
  }
  Refresh(t) {
    this.hTc = t.H6n;
    this.Jqf = t.lMs;
    this._Tc = t.j6n;
  }
  GetRewardList() {
    var t = this.TaskConfig.NormalDropId;
    if (t <= 0) {
      return [];
    } else {
      return ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t);
    }
  }
  GetRewardName() {
    return this.TaskConfig.RewardName;
  }
  GetProgressText() {
    if (this.hTc === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskRunning) {
      return this.Jqf + "/" + this._Tc;
    } else {
      return this._Tc + "/" + this._Tc;
    }
  }
  SetTaskStatus(t) {
    this.hTc = t;
  }
  GetTaskStatus() {
    return this.hTc;
  }
  GetTaskTarget() {
    return this._Tc;
  }
  CanReceiveReward() {
    return this.hTc === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskFinish;
  }
  IsTaskReceived() {
    return this.hTc === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken;
  }
  IsTaskRunning() {
    return this.hTc === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskRunning;
  }
}
exports.ActivityNewPlayerSupportTaskData = ActivityNewPlayerSupportTaskData;
//# sourceMappingURL=ActivityNewPlayerSupportTaskData.js.map