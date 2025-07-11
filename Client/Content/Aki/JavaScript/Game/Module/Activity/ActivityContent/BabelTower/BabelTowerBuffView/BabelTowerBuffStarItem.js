"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerStarItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class BabelTowerStarItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetText(e) {
    this.GetText(0).SetText(e);
  }
}
exports.BabelTowerStarItem = BabelTowerStarItem;
//# sourceMappingURL=BabelTowerBuffStarItem.js.map