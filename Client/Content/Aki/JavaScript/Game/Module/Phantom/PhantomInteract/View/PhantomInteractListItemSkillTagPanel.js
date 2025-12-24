"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractListItemSkillTagPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class PhantomInteractListItemSkillTagPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(s) {
    var t = s !== 0;
    this.RootItem?.SetUIActive(t);
    if (t) {
      let e = undefined;
      e = s === 1 ? "/Game/Aki/UI/UIResources/Common/Atlas/SP_ItemVision.SP_ItemVision" : "/Game/Aki/UI/UIResources/Common/Atlas/SP_ItemVisionB.SP_ItemVisionB";
      t = this.GetSprite(0);
      this.SetSpriteByPath(e, t, false);
    }
  }
}
exports.PhantomInteractListItemSkillTagPanel = PhantomInteractListItemSkillTagPanel;
//# sourceMappingURL=PhantomInteractListItemSkillTagPanel.js.map