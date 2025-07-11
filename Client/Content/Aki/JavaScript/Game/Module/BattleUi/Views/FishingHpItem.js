"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingHpItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FishingHpItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem]];
  }
  SetHpVisible(e) {
    this.GetSprite(0)?.SetUIActive(e);
  }
}
exports.FishingHpItem = FishingHpItem;
//# sourceMappingURL=FishingHpItem.js.map