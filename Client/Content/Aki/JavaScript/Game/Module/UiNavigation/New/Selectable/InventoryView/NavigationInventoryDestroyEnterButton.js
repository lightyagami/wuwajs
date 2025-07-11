"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationInventoryDestroyEnterButton = undefined;
const NavigationButton_1 = require("../NavigationButton");
class NavigationInventoryDestroyEnterButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    this.PanelHandle.SetItemGridDestroyMode(true);
  }
}
exports.NavigationInventoryDestroyEnterButton = NavigationInventoryDestroyEnterButton;
//# sourceMappingURL=NavigationInventoryDestroyEnterButton.js.map