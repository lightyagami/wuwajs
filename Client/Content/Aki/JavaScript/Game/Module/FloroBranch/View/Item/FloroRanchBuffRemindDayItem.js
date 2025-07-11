"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchBuffRemindDayItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class FloroRanchBuffRemindDayItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText]];
  }
  Refresh(e) {
    if (e) {
      this.GetArtText(0).SetText(e.RemindDay.toString());
      this.GetRootItem().SetUIActive(true);
    } else {
      this.GetRootItem().SetUIActive(false);
    }
  }
}
exports.FloroRanchBuffRemindDayItem = FloroRanchBuffRemindDayItem;
//# sourceMappingURL=FloroRanchBuffRemindDayItem.js.map