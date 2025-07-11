"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoguelikeGridToggle = undefined;
const UiNavigationNewController_1 = require("../../UiNavigationNewController");
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationRoguelikeGridToggle extends NavigationToggle_1.NavigationToggle {
  OnHandlePointerSelect(e) {
    var i = this.Selectable;
    if (i.ToggleState === 0 && e && e.inputType === 1 && i.bToggleOnSelect) {
      UiNavigationNewController_1.UiNavigationNewController.InteractClickByListener(this.Listener);
    }
    if (this.Listener.ScrollView) {
      this.Listener.ScrollView.ScrollToSelectableComponent(i);
    }
    return !!this.IsAllowNavigationByGroup();
  }
  OnIsIgnoreScrollOrLayoutCheck() {
    return true;
  }
}
exports.NavigationRoguelikeGridToggle = NavigationRoguelikeGridToggle;
//# sourceMappingURL=NavigationRoguelikeGridToggle.js.map