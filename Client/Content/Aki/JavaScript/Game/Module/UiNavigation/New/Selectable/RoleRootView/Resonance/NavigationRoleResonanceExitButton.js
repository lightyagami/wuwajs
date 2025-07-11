"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoleResonanceExitButton = undefined;
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager");
const NavigationButton_1 = require("../../NavigationButton");
class NavigationRoleResonanceExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType("RoleResonance");
    if (i) {
      (i = i?.GetPanelHandle()).ResetToggleSelect();
      i.SetDefaultNavigationListener(undefined);
    }
  }
}
exports.NavigationRoleResonanceExitButton = NavigationRoleResonanceExitButton;
//# sourceMappingURL=NavigationRoleResonanceExitButton.js.map