"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationCalabashDetailExitButton = undefined;
const UiNavigationNewController_1 = require("../../UiNavigationNewController");
const NavigationButton_1 = require("../NavigationButton");
class NavigationCalabashDetailExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
  }
}
exports.NavigationCalabashDetailExitButton = NavigationCalabashDetailExitButton;
//# sourceMappingURL=NavigationCalabashDetailExitButton.js.map