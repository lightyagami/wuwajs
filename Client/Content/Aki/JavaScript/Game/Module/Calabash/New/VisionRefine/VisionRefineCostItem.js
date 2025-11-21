"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineCostItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionRefineCostItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UITexture]];
  }
  SetCost(e, s) {
    this.SetItemIcon(this.GetTexture(2), e);
    this.GetText(1)?.SetText(s.toString());
  }
}
exports.VisionRefineCostItem = VisionRefineCostItem;
//# sourceMappingURL=VisionRefineCostItem.js.map