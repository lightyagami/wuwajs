"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditRootPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonTouchUiEditRootPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture]];
  }
  GetItemAttachRoot() {
    return this.GetItem(0);
  }
  SetBackgroundTexture(e) {
    var t = this.GetTexture(1);
    if (t && e.length !== 0) {
      t?.SetUIActive(true);
      this.SetTextureByPath(e, t);
    } else {
      t?.SetUIActive(false);
    }
  }
}
exports.CommonTouchUiEditRootPanel = CommonTouchUiEditRootPanel;
//# sourceMappingURL=CommonTouchUiEditRootPanel.js.map