"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueEndingTaskData = exports.RogueTaskData = undefined;
const RogueResTaskById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTaskById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class RogueTaskData {
  constructor(e) {
    this.Id = e;
    this.Status = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning;
    this.Current = 0;
    this.Target = 1;
  }
  IsFinished() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
  }
  IsTaken() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
  }
  GetRewardList() {
    var e;
    var o;
    var t = RogueResTaskById_1.configRogueResTaskById.GetConfig(this.Id);
    var r = [];
    for ([e, o] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t.Award).DropPreview) {
      r.push([{
        ItemId: e,
        IncId: 0
      }, o]);
    }
    return r;
  }
}
exports.RogueTaskData = RogueTaskData;
class RogueEndingTaskData {
  constructor(e) {
    this.Id = e;
    this.Status = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning;
    this.Current = 0;
    this.Target = 1;
  }
  IsFinished() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
  }
  IsTaken() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
  }
  GetRewardList() {
    var e;
    var o;
    var t = RogueResTaskById_1.configRogueResTaskById.GetConfig(this.Id);
    var r = [];
    for ([e, o] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t.Award).DropPreview) {
      r.push([{
        ItemId: e,
        IncId: 0
      }, o]);
    }
    return r;
  }
}
exports.RogueEndingTaskData = RogueEndingTaskData;
//# sourceMappingURL=RogueTaskData.js.map