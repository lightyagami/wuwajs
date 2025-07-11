"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationVisionReplaceSortTabToggle = undefined;
const UiNavigationNewController_1 = require("../../UiNavigationNewController");
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionReplaceSortTabToggle extends NavigationToggle_1.NavigationToggle {
  OnToggleClick() {
    var o = this.PanelHandle;
    var e = UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener();
    if (e && o && e.GroupName === o.ChangeListenerList[0].GroupName) {
      o.IsFindChangeListenerList = true;
      UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    }
  }
}
exports.NavigationVisionReplaceSortTabToggle = NavigationVisionReplaceSortTabToggle;
//# sourceMappingURL=NavigationVisionReplaceSortTabToggle.js.map