"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionCheckClientQuestNodeStatus = exports.LevelConditionOnNewViewCovered = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnNewViewCovered extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...r) {
    var e = e.LimitParams.get("FocusView"),
      [r] = r;
    return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Guide", 74, "LevelConditionOnNewViewCovered", ["聚焦界面", e], ["新界面", r]), e !== r && !LevelConditionOnNewViewCovered.L9s.has(r)
  }
}(exports.LevelConditionOnNewViewCovered = LevelConditionOnNewViewCovered).L9s = new Set(["GuideFocusView", "GuideTipsView", "GuideTutorialView", "GuideTutorialPopView", "GuideTutorialTipsView", "NetWorkMaskView"]);
class LevelConditionCheckClientQuestNodeStatus extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    if (0 === e.LimitParams.size) return Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]), !1;
    var r = Number(e.LimitParams.get("任务Id")),
      i = Number(e.LimitParams.get("步骤Id")),
      n = Number(e.LimitParams.get("状态")),
      t = e.LimitParamsOpe.get("状态") ?? "";
    if (isNaN(r) || isNaN(n) || isNaN(i)) return Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不合法", ["inConditionInfo.Id", e.Id]), !1;
    let a = 0;
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r);
    if (e) {
      e = e.GetNode(i);
      if (!e) return !1;
      a = e.Status
    } else {
      i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r);
      a = 3 === i ? Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess : Protocol_1.Aki.Protocol.BNs.Proto_NotActive
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
        return !1
    }
  }
}
exports.LevelConditionCheckClientQuestNodeStatus = LevelConditionCheckClientQuestNodeStatus;
//# sourceMappingURL=LevelConditionGuideCommon.js.map