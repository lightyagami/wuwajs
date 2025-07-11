"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityDebugInfoItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class FloroRanchEntityDebugInfoItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e) {
    var s = this.GetText(0);
    if (e) {
      s.SetUIActive(true);
      s.SetText(e.DebugUiShowInfo());
    } else {
      s.SetUIActive(false);
    }
  }
}
exports.FloroRanchEntityDebugInfoItem = FloroRanchEntityDebugInfoItem;
//# sourceMappingURL=FloroRanchEntityDebugInfoItem.js.map