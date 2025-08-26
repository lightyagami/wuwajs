"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRecyclePriceItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseRecyclePriceItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  UpdatePrice(e) {
    this.GetText(1)?.SetText("+" + e);
  }
}
exports.TrapDefenseRecyclePriceItem = TrapDefenseRecyclePriceItem;
//# sourceMappingURL=TrapDefenseRecyclePriceItem.js.map