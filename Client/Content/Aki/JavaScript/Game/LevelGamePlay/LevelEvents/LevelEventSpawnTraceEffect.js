"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSpawnTraceEffect = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSpawnTraceEffect extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.FRe = 0;
  }
  ExecuteNew(e, o) {
    if (e) {
      if (o.Type !== 6 || o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 18, "该事件仅用于任务行为树内配置");
        }
      } else {
        this.FRe = o.TreeConfigId;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 33, "参数配置错误");
    }
  }
  OnReset() {
    ControllerHolder_1.ControllerHolder.QuestNewController.ClearQuestTraceEffect(this.FRe);
  }
}
exports.LevelEventSpawnTraceEffect = LevelEventSpawnTraceEffect;
//# sourceMappingURL=LevelEventSpawnTraceEffect.js.map