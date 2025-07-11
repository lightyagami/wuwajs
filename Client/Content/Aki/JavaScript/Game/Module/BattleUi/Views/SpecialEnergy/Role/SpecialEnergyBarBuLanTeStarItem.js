"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarBuLanTeStarItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class SpecialEnergyBarBuLanTeStarItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture]];
  }
  SetIsEmpty(e) {
    this.GetTexture(0)?.SetUIActive(e);
    this.GetTexture(1)?.SetUIActive(!e);
  }
  SetStarEnable(e) {
    this.GetTexture(2)?.SetUIActive(e);
  }
}
exports.SpecialEnergyBarBuLanTeStarItem = SpecialEnergyBarBuLanTeStarItem;
//# sourceMappingURL=SpecialEnergyBarBuLanTeStarItem.js.map