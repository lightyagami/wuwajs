"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractListLongPressPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class PhantomInteractListLongPressPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  SetFillProgress(e) {
    var s = this.GetSprite(0);
    if (s) {
      s.SetFillAmount(e);
    }
  }
}
exports.PhantomInteractListLongPressPanel = PhantomInteractListLongPressPanel;
//# sourceMappingURL=PhantomInteractListLongPressPanel.js.map