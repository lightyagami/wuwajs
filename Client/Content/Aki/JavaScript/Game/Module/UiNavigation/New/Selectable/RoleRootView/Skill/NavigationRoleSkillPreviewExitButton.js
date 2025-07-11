"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoleSkillPreviewExitButton = undefined;
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager");
const NavigationButton_1 = require("../../NavigationButton");
class NavigationRoleSkillPreviewExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType("RoleSkill");
    if (i) {
      (i = i.GetPanelHandle()).IsInPreview = false;
      i.SetSkillTreeToggleCursorActive(true);
    }
  }
}
exports.NavigationRoleSkillPreviewExitButton = NavigationRoleSkillPreviewExitButton;
//# sourceMappingURL=NavigationRoleSkillPreviewExitButton.js.map