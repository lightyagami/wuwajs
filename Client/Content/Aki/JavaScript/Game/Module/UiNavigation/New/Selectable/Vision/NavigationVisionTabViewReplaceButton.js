"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationVisionTabViewReplaceButton = undefined;
const UiNavigationGlobalData_1 = require("../../UiNavigationGlobalData");
const NavigationButton_1 = require("../NavigationButton");
class NavigationVisionTabViewReplaceButton extends NavigationButton_1.NavigationButton {
  InteractClickHandle() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault = true;
  }
}
exports.NavigationVisionTabViewReplaceButton = NavigationVisionTabViewReplaceButton;
//# sourceMappingURL=NavigationVisionTabViewReplaceButton.js.map