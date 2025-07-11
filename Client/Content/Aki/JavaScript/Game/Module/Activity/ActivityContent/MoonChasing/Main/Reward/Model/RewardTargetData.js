"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardTargetData = undefined;
const Protocol_1 = require("../../../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const TaskData_1 = require("../../../../Common/TaskItem/TaskData");
const taskStateResolver = {
  [Protocol_1.Aki.Protocol.H8s.Proto_TrackMoonTargetRunning]: 1,
  [Protocol_1.Aki.Protocol.H8s.Proto_TrackMoonTargetFinish]: 0,
  [Protocol_1.Aki.Protocol.H8s.Proto_TrackMoonTargetTaken]: 2
};
class RewardTargetData {
  constructor(t) {
    this.Id = t;
    this.Status = Protocol_1.Aki.Protocol.H8s.Proto_TrackMoonTargetRunning;
    this.sOn = new TaskData_1.TaskData();
    this.Current = 0;
    this.Target = 1;
  }
  IsFinished() {
    return this.Status === Protocol_1.Aki.Protocol.H8s.Proto_TrackMoonTargetFinish;
  }
  IsTaken() {
    return this.Status === Protocol_1.Aki.Protocol.H8s.Proto_TrackMoonTargetTaken;
  }
  GetRewardList() {
    var t;
    var r;
    var e = ConfigManager_1.ConfigManager.MoonChasingRewardConfig.GetRewardTargetById(this.Id);
    var o = [];
    for ([t, r] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e.TargetReward).DropPreview) {
      o.push([{
        ItemId: t,
        IncId: 0
      }, r]);
    }
    return o;
  }
  ConvertToTaskData() {
    var t = ConfigManager_1.ConfigManager.MoonChasingRewardConfig.GetRewardTargetById(this.Id);
    this.sOn.TaskId = this.Id;
    this.sOn.IsFinished = this.IsFinished();
    this.sOn.IsTaken = this.IsTaken();
    this.sOn.Status = taskStateResolver[this.Status];
    this.sOn.RewardList = this.GetRewardList();
    this.sOn.Current = this.Current;
    this.sOn.Target = this.Target;
    this.sOn.JumpId = t.TargetFunc;
    this.sOn.TitleTextId = t.TargetName;
    this.sOn.ReceiveDelegate = ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonTargetRewardRequest;
    return this.sOn;
  }
}
exports.RewardTargetData = RewardTargetData;
//# sourceMappingURL=RewardTargetData.js.map