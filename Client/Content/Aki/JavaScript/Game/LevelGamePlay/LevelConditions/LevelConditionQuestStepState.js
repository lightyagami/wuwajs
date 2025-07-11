"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionQuestStepState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionQuestStepState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
    var o = Number(e.LimitParams.get("任务Id"));
    var a = Number(e.LimitParams.get("步骤Id"));
    var n = Number(e.LimitParams.get("状态"));
    if (isNaN(o) || isNaN(n) || isNaN(a)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不合法", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
    switch (n) {
      case 0:
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o);
        if (t === 3) {
          return false;
        } else {
          return t <= 2 || ((t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o)) ? !(t = t.GetNode(a)) || t.Status < Protocol_1.Aki.Protocol.BNs._5n : (Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "任务步骤条件检测：找不到进行中的任务"), false));
        }
      case 1:
        return false;
      case 2:
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o);
        if (t?.IsProgressing) {
          return !!(t = t.GetNode(a)) && t.IsProcessing;
        } else {
          return false;
        }
      case 3:
        return false;
      case 4:
        return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(o);
      default:
        return false;
    }
  }
  CheckNew(e, r) {
    var o = e;
    if (!o) {
      return false;
    }
    let a = false;
    switch (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o.QuestId)) {
      case 0:
      case 1:
        a = false;
        break;
      case 3:
        a = true;
        break;
      case 2:
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o.QuestId)?.GetNode(o.ChildQuestId);
        a = n?.IsSuccess ?? false;
    }
    if ((o.Compare ?? "Eq") === "Eq") {
      return a;
    } else {
      return !a;
    }
  }
}
exports.LevelConditionQuestStepState = LevelConditionQuestStepState;
//# sourceMappingURL=LevelConditionQuestStepState.js.map