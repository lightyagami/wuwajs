"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationVisionTabViewToggle = undefined;
const UiNavigationGlobalData_1 = require("../../UiNavigationGlobalData");
const NavigationDragComponent_1 = require("../NavigationDragComponent");
class NavigationVisionTabViewToggle extends NavigationDragComponent_1.NavigationDragComponent {
  InteractClickFailHandle() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault = false;
  }
  InteractClickHandle() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault = false;
  }
}
exports.NavigationVisionTabViewToggle = NavigationVisionTabViewToggle;
//# sourceMappingURL=NavigationVisionTabViewToggle.js.map