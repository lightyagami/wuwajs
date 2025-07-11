"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoleSkillPreviewToggle = undefined;
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager");
const NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleSkillPreviewToggle extends NavigationToggle_1.NavigationToggle {
  OnToggleClick(e) {
    var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType("RoleSkill");
    if (i) {
      (i = i.GetPanelHandle()).IsInPreview = e === 1;
      i.SetSkillTreeToggleCursorActive(e !== 1);
    }
  }
}
exports.NavigationRoleSkillPreviewToggle = NavigationRoleSkillPreviewToggle;
//# sourceMappingURL=NavigationRoleSkillPreviewToggle.js.map