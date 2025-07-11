"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationCommonRefreshNavigationButton = undefined;
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const NavigationButton_1 = require("../NavigationButton");
class NavigationCommonRefreshNavigationButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirtyByListener(this.Listener);
  }
}
exports.NavigationCommonRefreshNavigationButton = NavigationCommonRefreshNavigationButton;
//# sourceMappingURL=NavigationCommonRefreshNavigationButton.js.map