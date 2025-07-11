"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaMultipleResultItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GachaMultipleResultItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout]];
  }
  GetGachaResultItemLayout() {
    return this.GetGridLayout(0);
  }
}
exports.GachaMultipleResultItem = GachaMultipleResultItem;
//# sourceMappingURL=GachaMultipleResultItem.js.map