"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordMarkTargetListItemPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class GreatSwordMarkTargetListItemPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  SetDescTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
  SetState(e) {
    let t = "";
    switch (e) {
      case false:
        t = "T_MapDifficultyEmpty";
        break;
      case true:
        t = "T_MapDifficultyTick";
    }
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(e, this.GetTexture(1));
  }
}
exports.GreatSwordMarkTargetListItemPanel = GreatSwordMarkTargetListItemPanel;
//# sourceMappingURL=GreatSwordMarkTargetListItemPanel.js.map