"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoleSkillPreviewToggle = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager");
const NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleSkillPreviewToggle extends NavigationToggle_1.NavigationToggle {
  OnToggleClick(e) {
    var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (i) {
      if (i = i.GetPanelConfigByType("RoleSkill")) {
        (i = i.GetPanelHandle()).IsInPreview = e === 1;
        i.SetSkillTreeToggleCursorActive(e !== 1);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiNavigation", 88, "当前没有可用的导航视图句柄", ["state", e]);
    }
  }
}
exports.NavigationRoleSkillPreviewToggle = NavigationRoleSkillPreviewToggle;
//# sourceMappingURL=NavigationRoleSkillPreviewToggle.js.map