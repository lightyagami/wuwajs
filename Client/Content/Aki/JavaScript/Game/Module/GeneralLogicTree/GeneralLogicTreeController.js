"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralLogicTreeController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralController_1 = require("../../LevelGamePlay/LevelGeneralController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ControllerWithAssistantBase_1 = require("./ControllerAssistant/ControllerWithAssistantBase");
const GuaranteeAssistant_1 = require("./ControllerAssistant/GuaranteeAssistant");
const RequestToServerAssistant_1 = require("./ControllerAssistant/RequestToServerAssistant");
const ServerNotifyAssistant_1 = require("./ControllerAssistant/ServerNotifyAssistant");
const TreeExpressAssistant_1 = require("./ControllerAssistant/TreeExpressAssistant");
const assistantMap = {
  [0]: undefined,
  1: undefined,
  2: undefined,
  3: undefined
};
class GeneralLogicTreeController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnClear() {
    GeneralLogicTreeController.uYt = undefined;
    return super.OnClear();
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new ServerNotifyAssistant_1.ServerNotifyAssistant());
    this.AddAssistant(1, new RequestToServerAssistant_1.RequestToServerAssistant());
    this.AddAssistant(2, new TreeExpressAssistant_1.TreeExpressAssistant());
    this.AddAssistant(3, new GuaranteeAssistant_1.GuaranteeAssistant());
  }
  static cYt(e) {
    if (this.Assistants) {
      return this.Assistants.get(e);
    }
  }
  static OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, GeneralLogicTreeController.EUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, GeneralLogicTreeController.zYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, GeneralLogicTreeController.bZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BehaviorTreeStartActionSession, GeneralLogicTreeController.mYt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TearDownGeneralLogicTree, GeneralLogicTreeController.u$1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeSuspend, GeneralLogicTreeController.jro);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, GeneralLogicTreeController.EUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, GeneralLogicTreeController.zYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, GeneralLogicTreeController.bZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BehaviorTreeStartActionSession, GeneralLogicTreeController.mYt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TearDownGeneralLogicTree, GeneralLogicTreeController.u$1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeSuspend, GeneralLogicTreeController.jro);
    super.OnRemoveEvents();
  }
  static RequestSubmitNode(e, t, r = undefined) {
    this.cYt(1).RequestSubmitNode(e, t, r);
  }
  static RequestSubmitAwakeAndLoadEntityNode(e, t) {
    this.cYt(1).RequestSubmitAwakeAndLoadEntityNode(e, t);
  }
  static RequestSetTimerInfo(e, t, r, s, o) {
    this.cYt(1).RequestSetTimerInfo(e, t, r, s, o);
  }
  static RequestGiveUp(e, t) {
    this.cYt(1).RequestGiveUp(e, t);
  }
  static RequestRollback(e, t) {
    this.cYt(1).RequestRollback(e, t);
  }
  static RequestTimerEnd(e, t) {
    this.cYt(1).RequestTimerEnd(e, t);
  }
  static RequestFinishUiGameplay(e, t) {
    this.cYt(1).RequestFinishUiGameplay(e, t);
  }
  static RequestForcedOccupation(e, t) {
    this.cYt(1).RequestForcedOccupation(e, t);
  }
  static RequestEntityPosition(e, t, r) {
    return this.cYt(1).RequestEntityPosition(e, t, r);
  }
  static GetEntityPos(e, t, r) {
    return this.cYt(1).GetEntityPos(e, t, r);
  }
  static IsShowNodeStatus(e) {
    return TreeExpressAssistant_1.TreeExpressAssistant.IsShowNodeStatus(e);
  }
  static GetTitleTrackNodeId(e) {
    return TreeExpressAssistant_1.TreeExpressAssistant.GetTitleTrackNodeId(e);
  }
  static IsShowTrackDistance(e, t) {
    return TreeExpressAssistant_1.TreeExpressAssistant.IsShowTrackDistance(e, t);
  }
  static IsShowNodeTrackDistance(e, t) {
    return TreeExpressAssistant_1.TreeExpressAssistant.IsShowNodeTrackDistance(e, t);
  }
  static GetTitleText(e, t, r, s) {
    return TreeExpressAssistant_1.TreeExpressAssistant.GetTitleText(e, t, r, s);
  }
  static GetNodeTrackText(e, t) {
    return TreeExpressAssistant_1.TreeExpressAssistant.GetNodeTrackText(e, t);
  }
  static FormatStepTextByVarValue(e, t, r, s) {
    return TreeExpressAssistant_1.TreeExpressAssistant.FormatStepTextByVarValueByKey(e, t, r, s);
  }
  static TryReleaseExpressionOccupation(e) {
    TreeExpressAssistant_1.TreeExpressAssistant.TryReleaseExpressionOccupation(e);
  }
  static OpenSystemBoardResultRequest(e, t) {
    this.cYt(0).OpenSystemBoardResultRequest(e, t);
  }
}
(exports.GeneralLogicTreeController = GeneralLogicTreeController).uYt = undefined;
GeneralLogicTreeController.zYe = () => {
  GeneralLogicTreeController.EUe(() => {
    var e;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e = "TaskOccupyGeneralDes_1005";
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? e;
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
    }
  });
};
GeneralLogicTreeController.EUe = r => {
  var e = () => {
    GeneralLogicTreeController.uYt = undefined;
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetAllBehaviorTrees();
    if (e && e.size > 0) {
      for (var [, t] of e) {
        t.SetSleep(false);
      }
    }
    ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeWakeUp);
    if (r) {
      r();
    }
  };
  if (UiManager_1.UiManager.IsViewShow("BattleView")) {
    e();
  } else {
    GeneralLogicTreeController.uYt = new CustomPromise_1.CustomPromise();
    GeneralLogicTreeController.uYt.Promise.then(e);
  }
};
GeneralLogicTreeController.bZe = () => {
  GeneralLogicTreeController.uYt?.SetResult(true);
};
GeneralLogicTreeController.mYt = e => {
  var t;
  var r;
  var s = e.cvs;
  let o = undefined;
  switch (s.fvs) {
    case Protocol_1.Aki.Protocol.TOs.bvs:
      o = s.bvs.ups;
      break;
    case Protocol_1.Aki.Protocol.TOs.Bvs:
      o = s.Bvs.ups;
      break;
    case Protocol_1.Aki.Protocol.TOs.qvs:
      o = s.qvs.ups;
      break;
    case Protocol_1.Aki.Protocol.TOs.Gvs:
      o = s.Gvs.ups;
      break;
    case Protocol_1.Aki.Protocol.TOs.Ovs:
      o = s.Ovs.ups;
      break;
    case Protocol_1.Aki.Protocol.TOs.$vs:
      o = s.$vs.ups;
      break;
    case Protocol_1.Aki.Protocol.TOs.R3u:
      o = s.R3u.ups;
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_ChildQuestNodeStuckCheckAction:
      o = s.IId.ups;
  }
  if (o) {
    t = MathUtils_1.MathUtils.LongToBigInt(o.w5n);
    if (r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t)) {
      r.DoAction(s, o.b5n, e.W5n, e.w5n, e.K5n, e.mvs, e.sS_);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知执行行为时：对应的数据不存在，联系程序检查Bug", ["treeType", o.hps], ["treeId", t], ["actionIncId", e.w5n]);
    }
  }
};
GeneralLogicTreeController.u$1 = e => {
  var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(e);
  if (t?.IsPendingDestroy) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.AddToPendingDestroy(e, t);
  }
};
GeneralLogicTreeController.jro = e => {
  e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
  if (e) {
    for (const t of e.GetBlackBoard().GetCurrentExecuteActions()) {
      LevelGeneralController_1.LevelGeneralController.StopActionsExecute(t);
    }
    e.ExecuteTreeGuaranteeActions();
  }
}; //# sourceMappingURL=GeneralLogicTreeController.js.map