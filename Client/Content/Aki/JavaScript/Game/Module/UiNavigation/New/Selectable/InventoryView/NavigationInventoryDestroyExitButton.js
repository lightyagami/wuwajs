"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationInventoryDestroyExitButton = undefined;
const NavigationButton_1 = require("../NavigationButton");
class NavigationInventoryDestroyExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    this.PanelHandle.SetItemGridDestroyMode(false);
  }
}
exports.NavigationInventoryDestroyExitButton = NavigationInventoryDestroyExitButton;
//# sourceMappingURL=NavigationInventoryDestroyExitButton.js.map