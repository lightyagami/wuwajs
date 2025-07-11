"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMoraleWarnItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class MapMoraleWarnItem extends UiPanelBase_1.UiPanelBase {
  async Init(e, t = "UiItem_MapTipButtom") {
    await this.CreateByResourceIdAsync(t, e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  UpdateTitle(e) {
    this.GetText(0)?.ShowTextNew(e);
  }
}
exports.MapMoraleWarnItem = MapMoraleWarnItem;
//# sourceMappingURL=MapMoraleWarnItem.js.map