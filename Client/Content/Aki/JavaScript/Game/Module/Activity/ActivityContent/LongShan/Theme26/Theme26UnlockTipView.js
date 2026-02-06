"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme26UnlockTipView = undefined;
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const ActivityLongShanController_1 = require("../ActivityLongShanController");
class Theme26UnlockTipView extends UiViewBase_1.UiViewBase {
  OnAfterShow() {
    this.CloseMe();
  }
  GetExtraResourceId(e) {
    return ActivityLongShanController_1.ActivityLongShanController.GetActivityUiConfig(e.Id).OpenTipId;
  }
}
exports.Theme26UnlockTipView = Theme26UnlockTipView;
//# sourceMappingURL=Theme26UnlockTipView.js.map