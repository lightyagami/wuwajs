"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarNumItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SpecialEnergyBarNumItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.wst = -1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetNum(e) {
    if (this.wst !== e) {
      this.wst = e;
      this.GetText(0)?.SetText(e.toString());
    }
  }
}
exports.SpecialEnergyBarNumItem = SpecialEnergyBarNumItem;
//# sourceMappingURL=SpecialEnergyBarNumItem.js.map