"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationReFindMultipleScrollGridToggle = undefined;
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const FindMultiTemplateNavigationListener_1 = require("../../FindAction/FindMultiTemplateNavigationListener");
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationReFindMultipleScrollGridToggle extends NavigationToggle_1.NavigationToggle {
  OnCanFocusInScrollOrLayout() {
    return false;
  }
  OnToggleClick() {
    var i;
    var e;
    if (this.Listener && this.Listener.HasMultiTemplateScrollView() && this.Listener.PanelConfig) {
      i = this.Listener.ScrollProxy.ScrollView.GetGridIndexByChildComponent(this.Listener.GetSelectableComponent());
      (e = new FindMultiTemplateNavigationListener_1.FindMultiTemplateNavigationListener()).PanelConfig = this.Listener.PanelConfig;
      e.AddParam([this.Listener, i]);
      e.AddParam([this.Listener]);
      this.Listener.PanelConfig.SetFindNavigationAction(e);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    }
  }
}
exports.NavigationReFindMultipleScrollGridToggle = NavigationReFindMultipleScrollGridToggle;
//# sourceMappingURL=NavigationReFindMultipleScrollGridToggle.js.map