"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoleResonanceLockToggle = undefined;
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../../../UiNavigationNewController");
const NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleResonanceLockToggle extends NavigationToggle_1.NavigationToggle {
  OnStart() {
    var i = this.Selectable;
    var t = this.PanelHandle;
    t.AddLockNavigationListener(this.Listener);
    if (!StringUtils_1.StringUtils.IsBlank(t.GroupName)) {
      i.bToggleOnSelect = true;
      t.SetDefaultNavigationListener(this.Listener);
      UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    }
  }
  OnToggleClick() {
    var i = this.PanelHandle;
    i.SetDefaultNavigationListener(this.Listener);
    if (StringUtils_1.StringUtils.IsBlank(i.GroupName)) {
      i.SetToggleSelectByGroupName(this.Listener.GroupName);
    }
  }
}
exports.NavigationRoleResonanceLockToggle = NavigationRoleResonanceLockToggle;
//# sourceMappingURL=NavigationRoleResonanceLockToggle.js.map