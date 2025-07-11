"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoleSkillTreeExitButton = undefined;
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager");
const NavigationButton_1 = require("../../NavigationButton");
class NavigationRoleSkillTreeExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType("RoleSkill");
    if (i) {
      (i?.GetPanelHandle()).ResetToggleSelect();
    }
  }
}
exports.NavigationRoleSkillTreeExitButton = NavigationRoleSkillTreeExitButton;
//# sourceMappingURL=NavigationRoleSkillTreeExitButton.js.map