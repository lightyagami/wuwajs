"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardAttributeItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SurvivorsRogueCardAttributeItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture]];
  }
  SetIsUp(e) {
    this.GetItem(0).SetUIActive(!e);
    this.GetItem(1).SetUIActive(e);
  }
  SetTextureIcon(e) {
    if (e) {
      this.SetTextureShowUntilLoaded(e, this.GetTexture(2));
    }
  }
}
exports.SurvivorsRogueCardAttributeItem = SurvivorsRogueCardAttributeItem;
//# sourceMappingURL=SurvivorsRogueCardAttributeItem.js.map