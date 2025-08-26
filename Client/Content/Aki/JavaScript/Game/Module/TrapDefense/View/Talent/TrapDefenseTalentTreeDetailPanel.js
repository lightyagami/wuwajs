"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeDetailPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapDefenseTalentTreeDetailPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIText]];
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.SelectedNode;
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), TrapDefenseDefine_1.trapDefenseTalentTreeTypeNames[e.Type]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Desc);
      this.SetSpriteByPath(e.IconBig, this.GetSprite(2), false);
    }
  }
}
exports.TrapDefenseTalentTreeDetailPanel = TrapDefenseTalentTreeDetailPanel;
//# sourceMappingURL=TrapDefenseTalentTreeDetailPanel.js.map