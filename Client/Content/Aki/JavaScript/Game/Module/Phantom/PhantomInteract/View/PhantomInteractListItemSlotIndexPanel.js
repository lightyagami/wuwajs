"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractListItemSlotIndexPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class PhantomInteractListItemSlotIndexPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetIndex(e) {
    var t = this.GetText(0);
    if (t) {
      t.SetText(e.toString());
    }
  }
}
exports.PhantomInteractListItemSlotIndexPanel = PhantomInteractListItemSlotIndexPanel;
//# sourceMappingURL=PhantomInteractListItemSlotIndexPanel.js.map