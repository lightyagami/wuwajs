"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeDetailTipsItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestTreeNodeDetailTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Pe = e;
    this.eje = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Pe.QuestId);
      if (e && e.IsSuspend()) {
        e = e.GetOccupations();
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SetOverrideLockReasonGoto(true);
        UiManager_1.UiManager.OpenView("QuestLockPreview", e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.eje]];
  }
  SetLocalText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
  SetBtnActive(e) {
    this.GetButton(2).GetRootComponent().SetUIActive(e);
  }
  UpdateData(e) {
    this.Pe = e;
  }
}
exports.QuestTreeNodeDetailTipsItem = QuestTreeNodeDetailTipsItem;
//# sourceMappingURL=QuestTreeNodeDetailTipsItem.js.map