"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyPosition = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoMonopolyPosition extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateByResourceIdAsync("UiItem_ActivityMonopolySle", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  UpdatePosition(e, o = true) {
    this.SetActive(o);
    this.GetRootItem().SetAnchorOffset(e);
  }
}
exports.DangoMonopolyPosition = DangoMonopolyPosition;
//# sourceMappingURL=DangoMonopolyPosition.js.map