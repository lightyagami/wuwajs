"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationVisionToggle = undefined;
const UiNavigationNewController_1 = require("../../UiNavigationNewController");
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionToggle extends NavigationToggle_1.NavigationToggle {
  OnHandlePointerSelect(e) {
    var i = this.Selectable;
    if (i.ToggleState === 0 && e && e.inputType === 1 && i.bToggleOnSelect) {
      UiNavigationNewController_1.UiNavigationNewController.InteractClickByListener(this.Listener);
    }
    this.ScrollToSelectableComponent(i);
    return !!this.IsAllowNavigationByGroup();
  }
  OnIsIgnoreScrollOrLayoutCheck() {
    return true;
  }
}
exports.NavigationVisionToggle = NavigationVisionToggle;
//# sourceMappingURL=NavigationVisionToggle.js.map