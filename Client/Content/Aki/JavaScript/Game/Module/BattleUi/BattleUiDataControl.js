"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiDataControl = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const IQuest_1 = require("../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
class BattleUiDataControl extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeProgressChange, this.VQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.fIe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.HQe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeProgressChange, this.VQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.fIe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.HQe);
    var e = ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
    InputDistributeController_1.InputDistributeController.UnBindActions(e, this.bMe);
  }
}
(exports.BattleUiDataControl = BattleUiDataControl).FQe = e => {
  if (e === "GuideFocusView") {
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(true);
  }
};
BattleUiDataControl.$Ge = e => {
  if (e === "GuideFocusView") {
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(false);
  }
};
BattleUiDataControl.VQe = (t, n) => {
  if (t && t.Type === 6 && n.gEs) {
    let e = undefined;
    switch (t.BtType) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        e = ModelManager_1.ModelManager.QuestNewModel.GetQuestNodeConfig(t.TreeConfigId, t.NodeId);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(t.TreeConfigId, t.NodeId);
    }
    var o;
    if (e && e.Type === "ChildQuest" && (o = e.Condition).Type === IQuest_1.EChildQuest.MonsterCreator && o.ShowMonsterMergedHpBar) {
      ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.UpdateProgress(t.TreeIncId, t.NodeId, n.gEs, o.TidMonsterGroupName, o.MonsterMergedHpBarSettings);
    }
  }
};
BattleUiDataControl.fIe = (e, t, n) => {
  if (e instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext) {
    if (n === Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed || n === Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess || n === Protocol_1.Aki.Protocol.BNs.Proto_Destroy) {
      ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveNode(e.TreeIncId, e.NodeId);
    }
  }
};
BattleUiDataControl.HQe = e => {
  ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveTree(e);
};
BattleUiDataControl.bMe = (e, t) => {
  ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(e, t === 0);
}; //# sourceMappingURL=BattleUiDataControl.js.map