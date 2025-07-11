"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventToggleScanSplineEffect = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleScanSplineEffect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      if (o.Type !== 6 || o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 31, "该事件仅用于任务行为树内配置");
        }
      }
      var r = o;
      var l = e;
      switch (l.Type) {
        case IAction_1.ETraceSplineOptionType.Open:
          var t = l;
          ControllerHolder_1.ControllerHolder.QuestNewController.AddQuestTraceEffect(r.TreeConfigId, t.Duration, t.SplineEntityId);
          break;
        case IAction_1.ETraceSplineOptionType.Close:
          t = l;
          ControllerHolder_1.ControllerHolder.QuestNewController.RemoveQuestTraceEffect(r.TreeConfigId, t.SplineEntityId);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 31, "参数配置错误");
    }
  }
}
exports.LevelEventToggleScanSplineEffect = LevelEventToggleScanSplineEffect;
//# sourceMappingURL=LevelEventsToggleScanSplineEffect.js.map