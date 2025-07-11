"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckClientQuestNodeStatus = exports.LevelConditionOnNewViewCovered = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnNewViewCovered extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...r) {
    var e = e.LimitParams.get("FocusView");
    var [r] = r;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 74, "LevelConditionOnNewViewCovered", ["聚焦界面", e], ["新界面", r]);
    }
    return e !== r && !LevelConditionOnNewViewCovered.L9s.has(r);
  }
}
(exports.LevelConditionOnNewViewCovered = LevelConditionOnNewViewCovered).L9s = new Set(["GuideFocusView", "GuideTipsView", "GuideTutorialView", "GuideTutorialPopView", "GuideTutorialTipsView", "NetWorkMaskView"]);
class LevelConditionCheckClientQuestNodeStatus extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
    var r = Number(e.LimitParams.get("任务Id"));
    var i = Number(e.LimitParams.get("步骤Id"));
    var n = Number(e.LimitParams.get("状态"));
    var t = e.LimitParamsOpe.get("状态") ?? "";
    if (isNaN(r) || isNaN(n) || isNaN(i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不合法", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
    let a = 0;
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r);
    if (e) {
      e = e.GetNode(i);
      if (!e) {
        return false;
      }
      a = e.Status;
    } else {
      i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r);
      a = i === 3 ? Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess : Protocol_1.Aki.Protocol.BNs.Proto_NotActive;
    }
    switch (t) {
      case "":
        return n === a;
      case "<":
        return n < a;
      case "<=":
        return n <= a;
      case ">":
        return n > a;
      case ">=":
        return n >= a;
      case "!=":
        return n !== a;
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckClientQuestNodeStatus = LevelConditionCheckClientQuestNodeStatus;
//# sourceMappingURL=LevelConditionGuideCommon.js.map