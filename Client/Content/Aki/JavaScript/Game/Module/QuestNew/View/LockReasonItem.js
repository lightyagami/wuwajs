"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockReasonItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
class LockReasonItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.hno = "";
    this.lno = "";
    this.KMa = "";
    this.$mt = BigInt(0);
    this.YP = () => {
      var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.$mt);
      if (e) {
        if (ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.OverrideLockReasonGoto) {
          ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SetOverrideLockReasonGoto(false);
          ControllerHolder_1.ControllerHolder.QuestTreeController.JumpToQuest(e.TreeConfigId);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNavigationQuest, e.TreeConfigId);
        }
        UiManager_1.UiManager.CloseView("QuestLockPreview");
      }
    };
    this.hno = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeName(e.TreeIncId);
    this.lno = ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(e.ResourceName);
    this.KMa = ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationType(e.ResourceName);
    this.$mt = e.TreeIncId;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.YP]];
  }
  OnStart() {
    this.UpdateItem();
  }
  UpdateItem() {
    this.GetText(0)?.SetText(this.hno);
    let e = "";
    var t = (e = this.KMa === "Area" ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_OccupiedArea") ?? "" : MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_OccupiedRole") ?? "") + ":" + this.lno;
    this.GetText(1)?.SetText(t);
  }
}
exports.LockReasonItem = LockReasonItem;
//# sourceMappingURL=LockReasonItem.js.map