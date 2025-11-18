"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckUiItemShow = exports.LevelConditionCheckClientQuestNodeStatus = exports.LevelConditionOnNewViewCovered = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnNewViewCovered extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...i) {
    var e = e.LimitParams.get("FocusView");
    var [i] = i;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 74, "LevelConditionOnNewViewCovered", ["聚焦界面", e], ["新界面", i]);
    }
    return e !== i && !LevelConditionOnNewViewCovered.L9s.has(i);
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
    var i = Number(e.LimitParams.get("任务Id"));
    var n = Number(e.LimitParams.get("步骤Id"));
    var r = Number(e.LimitParams.get("状态"));
    var t = e.LimitParamsOpe.get("状态") ?? "";
    if (isNaN(i) || isNaN(r) || isNaN(n)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不合法", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
    let a = 0;
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
    if (e) {
      e = e.GetNode(n);
      if (!e) {
        return false;
      }
      a = e.Status;
    } else {
      n = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i);
      a = n === 3 ? Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess : Protocol_1.Aki.Protocol.BNs.Proto_NotActive;
    }
    switch (t) {
      case "":
        return r === a;
      case "<":
        return r < a;
      case "<=":
        return r <= a;
      case ">":
        return r > a;
      case ">=":
        return r >= a;
      case "!=":
        return r !== a;
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckClientQuestNodeStatus = LevelConditionCheckClientQuestNodeStatus;
class LevelConditionCheckUiItemShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var i = e.LimitParams.get("ViewName");
    var n = e.LimitParams.get("MarkName");
    if (i && n) {
      return !!(i = UiManager_1.UiManager.GetViewByName(i)) && !!i.IsShowOrShowing && ((i = i.GetRootActor()?.GetComponentByClass(UE.UIGuideMarkComponent.StaticClass())) ? (i = i.Children.Get(n)) ? !!(i = i.GetUIItem()) && i.IsUIActiveInHierarchy() : (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelCondition", 74, "LevelConditionCheckUiItemShow: 没有找到对应的引导标记", ["MarkName", n]), false) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Guide", 74, "LevelConditionCheckUiItemShow: 没有挂载UIGuideMarkComponent组件"), false));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 74, "LevelConditionCheckUiItemShow: 配置错误，参数不能为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckUiItemShow = LevelConditionCheckUiItemShow;
//# sourceMappingURL=LevelConditionGuideCommon.js.map