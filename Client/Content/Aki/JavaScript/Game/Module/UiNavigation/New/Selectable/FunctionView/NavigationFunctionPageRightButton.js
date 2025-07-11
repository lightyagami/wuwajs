"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationFunctionPageRightButton = undefined;
const NavigationButton_1 = require("../NavigationButton");
class NavigationFunctionPageRightButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    if (this.PanelHandle?.GetType() === "MainMenu") {
      this.PanelHandle.FindNextFocusListener();
    }
  }
}
exports.NavigationFunctionPageRightButton = NavigationFunctionPageRightButton;
//# sourceMappingURL=NavigationFunctionPageRightButton.js.map